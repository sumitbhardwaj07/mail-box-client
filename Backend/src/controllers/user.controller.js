import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken';
import { sendEmail } from "../utils/sendEmail.js";

/**
 * Generates both access and refresh tokens for a user
 */
const generateAccessAndRefereshTokens = async(userId) =>{
  try {
      //console.log(userId);
      const user = await User.findById(userId)
      //console.log(user);
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()
      //console.log(accessToken);
      //console.log(refreshToken)

      user.refreshToken = refreshToken
      await user.save({ validateBeforeSave: false })

      return {accessToken, refreshToken}


  } catch (error) {
      throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

/**
 * Registers a new user
 */
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // Generate OTP
  const otp = generateOtp();

  // Create JWT token with OTP and email
  const otpToken = jwt.sign(
    { email, otp },
    process.env.OTP_SECRET, // Secret for signing the OTP token
    { expiresIn: '10m' } // OTP validity for 10 minutes
  );

  // Send OTP via email
  const message = `Your OTP code is ${otp}. It is valid for 10 minutes.`;
  await sendEmail({
    email,
    subject: 'OTP for Registration',
    message,
  });

  // Respond to the user
  res.status(200).json({ success: true, message: 'OTP sent successfully', otpToken });
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { otpToken, otp, email, password } = req.body;

  if (!otpToken || !otp || !email || !password) {
    throw new ApiError(400, "OTP, email, and password are required");
  }

  // Verify JWT token
  let decodedToken;
  try {
    decodedToken = jwt.verify(otpToken, process.env.OTP_SECRET);
  } catch (error) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  // Check if the email in the token matches the provided email
  if (decodedToken.email !== email) {
    throw new ApiError(400, "Invalid email for this OTP");
  }

  // Check if OTP matches
  if (decodedToken.otp !== otp) {
    throw new ApiError(400, "Incorrect OTP");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }


  // Create user in the database
  const user = await User.create({
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "User registration failed");
  }

  res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

/**
 * Logs in a user
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = { httpOnly: true, secure: true };

  res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});

/**
 * Logs out the current user
 */
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

  const options = { httpOnly: true, secure: true };

  res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

/**
 * Refreshes access token using the refresh token
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);

    if (!user || incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Invalid or expired refresh token");
    }

    const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id);

    const options = { httpOnly: true, secure: true };

    res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }
});

/**
 * Changes the current user's password
 */
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

/**
 * Gets the current authenticated user
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, "User fetched successfully"));
});

export {
  sendOtp,
  verifyOtp,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
};
