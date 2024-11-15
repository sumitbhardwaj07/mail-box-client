import { useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import classes from "./AuthForm.module.css";
import { login, showForgotPassword } from "../../store/authReducer";
import ForgotPassword from "./ForgotPassword";
import { Base_URL } from "../../UI/Helper";


const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const otpInputRef = useRef();
  const dispatch = useDispatch();

  const showModal = useSelector(state => state.auth.showForgotPasswordModal);
  const [isLogin, setIsLogin] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setOtpSent(false); // Reset OTP sent state when switching
    setSuccessMessage('');
    setError('');
  };

  const forgotPasswordHandler = () => {
    dispatch(showForgotPassword());
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredOtp = otpInputRef.current ? otpInputRef.current.value : null;


    setIsLoading(true);
    setError(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages

    if (isLogin) {
      // Step 1: Login
      try {
        const response = await fetch(`${Base_URL}/api/v1/users/login`, {
          method: "POST",
          body: JSON.stringify({ email: enteredEmail, password: enteredPassword }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('accessToken', data.data.accessToken);
          localStorage.setItem('refreshToken', data.data.refreshToken);
          setSuccessMessage("Login successful!");
          dispatch(login({ token: data.data.accessToken, userId: data.data.user._id, email: data.data.user.email }));
          // Dispatch login action here, e.g.:
          // dispatch(authActions.login(data.user));
        } else {
          throw new Error(data.message || "Failed to log in.");
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      // Step 2: Register with OTP
      if (!otpSent) {
        // Send OTP
        try {
          const response = await fetch(`${Base_URL}/api/v1/users/send-otp`, {
            method: "POST",
            body: JSON.stringify({ email: enteredEmail }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          if (data.success) {
            setOtpSent(true);
            setOtpToken(data.otpToken);
            setSuccessMessage("OTP sent to your email.");
          } else {
            throw new Error(data.message || "Failed to send OTP.");
          }
        } catch (error) {
          setError(error.message);
        }
      } else {
        // Verify OTP and register
        try {
          const response = await fetch(`${Base_URL}/api/v1/users/verify-otp`, {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              otp: enteredOtp,
              otpToken: otpToken,
            }),
            headers: { "Content-Type": "application/json" },
          });

          const data = await response.json();
          if (data.success) {
            setSuccessMessage("Registration successful!");
            setIsLogin(true); // Switch to login mode after registration
          } else {
            throw new Error(data.message || "Failed to register.");
          }
        } catch (error) {
          setError(error.message);
        }
      }
    }

    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      {error && <p className={classes.error}>{error}</p>}
      {successMessage && <p className={classes.success}>{successMessage}</p>}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} disabled={isLoading} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef} disabled={isLoading} />
        </div>
        {isLogin && <button
            type="button"
            className={classes.forgot}
            onClick={forgotPasswordHandler}
          >
            Forgot password?
          </button>}
        {!isLogin && otpSent && (
          <div className={classes.control}>
            <label htmlFor="otp">OTP</label>
            <input type="text" id="otp" required ref={otpInputRef} disabled={isLoading} />
          </div>
        )}
        {/* {(!isLogin || otpSent) && (
          <>
            {!isLogin && (
              <div className={classes.control}>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" required ref={confirmPasswordInputRef} disabled={isLoading} />
              </div>
            )}
          </>
        )} */}
        
        <div className={classes.actions}>
          {!isLoading && (
            <button type="submit">{isLogin ? "Login" : otpSent ? "Register" : "Send OTP"}</button>
          )}
          
          {isLoading && <p>Sending request...</p>}
          <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
      {showModal && <ForgotPassword />}
    </section>
  );
};

export default AuthForm;
