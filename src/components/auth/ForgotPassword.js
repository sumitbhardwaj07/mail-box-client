import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { hideForgotPassword } from "../../store/authReducer";
import Modal from "../../UI/Modal";
import styles from "./ForgotPassword.module.css";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const emailInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideForgotPassword());
  };


  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
  
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBdRnB1G5j4QnJnCW1Se2cpHKnshEc_gpQ",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Password reset failed. Please try again later.";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      console.log(data.email);
      alert("An email has been sent to your email");
      dispatch(hideForgotPassword());
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  

  return (
    <Modal onClose={handleClose}>
      <form className={styles["form-container"]} onSubmit={submitHandler}>
        <h2>Forgot Password</h2>
        <div>
          <label htmlFor="forgotemail">Email:</label>
          <input
            id="forgotemail"
            type="email"
            required
            ref={emailInputRef}
            className={styles["input-field"]}
          />
          <Button variant="info" type="submit">
            Send link
          </Button>
        </div>
        {errorMessage && <p className={styles["error-message"]}>{errorMessage}</p>}
      </form>
    </Modal>
  );
};

export default ForgotPassword;