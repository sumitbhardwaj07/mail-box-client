import { useLocation } from "react-router-dom";
import "./EmailDetail.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Base_URL } from "../../../UI/Helper";


const EmailDetail = () => {

  const token = useSelector(state => state.auth.token);
  const location = useLocation();
  const {   to, subject, body, _id, time, isRead, type, attachment } = location.state;
 
  //console.log(attachment);

  let typeofMail="";
  if(type=="sent"){
    typeofMail="To"
  } else {
    typeofMail="From"
  }
   
    const updateIsReadStatus = async () => {
      try {
        const response = await fetch(`${Base_URL}/api/v1/emails/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
            credentials: "include"
          },
          body: JSON.stringify({ isRead: true }),
        });

        if (!response.ok) {
          throw new Error("Failed to update isRead status");
        }
        
      } catch (error) {
        console.error("Error updating isRead status:", error);
      }
    };
 
    useEffect(() => {
      if (isRead !== undefined) {
        updateIsReadStatus();
      }
    },[isRead,_id]);

    const isPdf = attachment && attachment.endsWith(".pdf");
    const isImage = attachment && /\.(jpg|jpeg|png|gif)$/i.test(attachment);
  return (
    <div className="emailContainer">
      <div className="emaildetails">
        <div className="emaildetails__left">
          <h4><span style={{color:"red"}}>{typeofMail}:</span> {to}</h4>
        </div>
        
        <div className="emaildetails__right">
          <p>{time}</p>
        </div>
      </div>
      <div className="emaildetails_subject">
      <div className="emaildetails__middle">
          <h4><span style={{color:"red"}}>Subject: </span>{subject}</h4>
        </div>
      </div>
      <div className="emailBodyContainer">
        <div className="emaildetails_body">
          <p>{body}</p>
        </div>
      </div>
      {attachment && (
        <div className="emailAttachment">
          <h5>Attachment:</h5>
          {isPdf ? (
            <a href={attachment} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          ) : isImage ? (
            <a href={attachment} target="_blank" rel="noopener noreferrer">
              <img src={attachment} alt="Email Attachment" style={{ maxWidth: "60%", height: "40%" }} />
            </a>
          ) : (
            <a href={attachment} target="_blank" rel="noopener noreferrer">
              View Attachment
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailDetail;
