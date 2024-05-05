import { useLocation } from "react-router-dom";
import "./EmailDetail.css";

const EmailDetail = () => {

  const location = useLocation();
  const {to, subject, body, time} = location.state;
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
