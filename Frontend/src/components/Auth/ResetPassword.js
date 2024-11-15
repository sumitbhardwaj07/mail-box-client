import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../../UI/Modal.js";
import styles from "./ForgotPassword.module.css";
import { hideResetPassword, showResetPassword } from "../../store/authReducer.js";
import { useDispatch } from "react-redux";
import { Base_URL } from "../../UI/Helper.js";


const ResetPassword = () => {
  const newPasswordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const { token } = useParams(); // Extract token from the URL
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideResetPassword());


  };

  dispatch(showResetPassword());
  const submitHandler = async (event) => {
    event.preventDefault();
    const newPassword = newPasswordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${Base_URL}/api/v1/forgotpass/resetpassword/${token}`, // Send token and password
        {
          method: "PATCH",
          body: JSON.stringify({ newPassword }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = data.message || "Password reset failed.";
        throw new Error(errorMessage);
      }

      setSuccessMessage("Password reset successfully.");
      alert("Password reset successfully.");
      navigate("/"); // Redirect to login page
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Modal onClose={handleClose}>
      <form onSubmit={submitHandler} className={styles["form-container"]}>
        <h2>Reset Your Password</h2>
        <div>
          <label htmlFor="newpassword">New Password:</label>
          <input id="newpassword" type="password" required ref={newPasswordInputRef} className={styles["input-field"]} />
        </div>
        <div>
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input id="confirmpassword" type="password" required ref={confirmPasswordInputRef} className={styles["input-field"]} />
        </div>
        <Button variant="success" type="submit">Reset Password</Button>
        {errorMessage && <p className={styles["error-message"]}>{errorMessage}</p>}
        {successMessage && <p className={styles["success-message"]}>{successMessage}</p>}
      </form>
    </Modal>
  );
};

export default ResetPassword;
