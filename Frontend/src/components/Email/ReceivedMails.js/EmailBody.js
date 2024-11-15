
import "./EmailBody.css";

const EmailBody = ({ to, subject, body, time, onClick, isRead, type, deleteHandler }) => {

  //console.log(typeof(subject));
  let typeofMail="";
  if(type=="sent"){
    typeofMail="To"
  } else {
    typeofMail="From"
  }
  
  
  const slicedSubject = subject.slice(0, 5)+ (subject.length > 5 ? "..." : "");;
  const slicedBody = body.slice(0, 5)+ (subject.length > 5 ? "..." : "");;
  
  //console.log(truncatedSubject);
  //console.log(truncatedBody);
  return (
    <div className={`emailbody `} onClick={onClick}>
      {isRead!==undefined && !isRead && <div className="blue-dot"></div>}
      <div className="emailbody__left">
        <h4><span style={{color:"red"}}>{typeofMail}:</span> {to}</h4>
      </div>
      <div className="emailbody__middle">
        <div className="emailbody__middle__msg">
          <p>
            <b>{slicedSubject}   </b>
            {slicedBody}
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
