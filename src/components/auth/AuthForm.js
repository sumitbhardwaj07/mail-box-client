import { useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login, showForgotPassword} from '../../store/authReducer';
import classes from "./AuthForm.module.css";
import ForgotPassword from "./ForgotPassword";


const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const dispatch = useDispatch();
  const showModal = useSelector(state => state.auth.showForgotPasswordModal);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const forgotPasswordHandler = () => {
    dispatch(showForgotPassword());
  };
 
  

  const submitHandler = async (event) => {
    event.preventDefault();
  
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmedPassword = confirmPasswordInputRef.current.value;
  
    if (!isLogin && enteredPassword !== enteredConfirmedPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBdRnB1G5j4QnJnCW1Se2cpHKnshEc_gpQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdRnB1G5j4QnJnCW1Se2cpHKnshEc_gpQ";
    }
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      console.log(data.email);
      alert("Login successful");
      dispatch(login({ token: data.idToken, userId: data.localId, email: data.email }));
    } catch (error) {
      alert(error.message);
    }
  
    setIsLoading(false);
  };
  

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            required
            ref={confirmPasswordInputRef}
            //onChange={(event) => setEnteredConfirmPassword(event.target.value)}
          />
        </div>
        <div>
        <button
            type="button"
            className={classes.toggle}
            onClick={forgotPasswordHandler}
          >
            Forgot password?
          </button>
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login.." : "Create new account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>

      {showModal && <ForgotPassword />}
    </section>
  );
};

export default AuthForm;

