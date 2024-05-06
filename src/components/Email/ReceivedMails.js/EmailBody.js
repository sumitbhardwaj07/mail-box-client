import { useSelector } from "react-redux";
import "./EmailBody.css";

const EmailBody = ({ to, subject, body, time, onClick, isRead, deleteHandler }) => {

    const email = useSelector(state => state.auth.email);

    // const deleteHandler = async (e) => {
    //     e.stopPropagation();
        
    //     const dummyEmail =email
    //     .toLowerCase()
    //     .split("")
    //     .filter((e) => e.charCodeAt(0) >= 97 && e.charCodeAt(0) <= 122)
    //     .join("");

    //     try {
    //         const response = await fetch(
    //           `https://mail-box-client-3b0eb-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/inbox/${emailId}.json`,
    //           {
    //             method: "DELETE"
    //           }
    //         );
        
    //         if (!response.ok) {
    //           throw new Error('Failed to delete the email');
    //         }
        
    //         alert('Email deleted successfully!');
    //       } catch (error) {
    //         alert(error.message);
    //       };

    // };
  return (
    <div className={`emailbody ${isRead ? "read" : "unread"}`} onClick={onClick}>
      {!isRead && <div className="blue-dot"></div>}
      <div className="emailbody__left">
        <h4>{to}</h4>
      </div>
      <div className="emailbody__middle">
        <div className="emailbody__middle__msg">
          <p>
            <b>{subject}</b>
            {body}
          </p>
        </div>
      </div>

      <div className="emailbody__right">
        <p>{time}</p>
        <button className="emailbody__delete-btn" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmailBody;
