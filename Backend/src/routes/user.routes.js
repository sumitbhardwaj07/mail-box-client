import { Router } from "express";
import { changeCurrentPassword, loginUser, logoutUser, refreshAccessToken, sendOtp, verifyOtp } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/send-otp").post(sendOtp)

router.route("/verify-otp").post(verifyOtp)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/changepassword").post(verifyJWT, changeCurrentPassword)
router.route("/refreshtoken").post(refreshAccessToken)
export default router