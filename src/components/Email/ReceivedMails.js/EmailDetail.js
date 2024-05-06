import { useLocation } from "react-router-dom";
import "./EmailDetail.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const EmailDetail = () => {

  const email = useSelector(state => state.auth.email);
  const location = useLocation();
  const {to, subject, body, time, id} = location.state;


  console.log(location.state);

  const dummyEmail = email
      .toLowerCase()
      .split("")
      .filter((e) => e.charCodeAt(0) >= 97 && e.charCodeAt(0) <= 122)
      .join("");

  useEffect(() => {
   
    const updateIsReadStatus = async () => {
      try {
        const response = await fetch(`https://mail-box-client-3b0eb-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/inbox/${id}.json`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
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

    updateIsReadStatus();
  }, [id]); 

  return (
    <div className="emailContainer">
      <div className="emaildetails">
        <div className="emaildetails__left">
          <h4>{to}</h4>
        </div>
        <div className="emaildetails__middle">
          <h4>{subject}</h4>
        </div>
        <div className="emaildetails__right">
          <p>{time}</p>
        </div>
      </div>
      <br/>
      <div className="emailBodyContainer">
        <div className="emaildetails_body">
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
