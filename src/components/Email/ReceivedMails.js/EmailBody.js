
import "./EmailBody.css";

const EmailBody = ({ to, subject, body, time, onClick, isRead, deleteHandler }) => {

  
  return (
    <div className={`emailbody `} onClick={onClick}>
      {isRead!==undefined && !isRead && <div className="blue-dot"></div>}
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
