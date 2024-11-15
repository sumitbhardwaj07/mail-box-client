import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { hideForgotPassword } from "../../store/authReducer";
import Modal from "../../UI/Modal.js";
import styles from "./ForgotPassword.module.css";
import { useDispatch } from "react-redux";
import { Base_URL } from "../../UI/Helper.js";


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
        `${Base_URL}/api/v1/forgotpass/requestpasswordreset`, // Your backend route
        {
          method: "POST", // Using PATCH for password reset request
          body: JSON.stringify({ email: enteredEmail }), // Sending email in request body
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Password reset failed. Please try again later.";
        if (data && data.message) {
          errorMessage = data.message; // Custom error message from backend
        }
        throw new Error(errorMessage); // Throw error if the response is not ok
      }

      // Assuming the backend responds with a success message
      const data = await response.json();
      alert("An email has been sent to reset your password."); // Notify the user
      dispatch(hideForgotPassword()); // Close the modal
    } catch (error) {
      setErrorMessage(error.message); // Set error message if there's an error
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