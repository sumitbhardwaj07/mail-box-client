
import './EmailBody.css';

const EmailBody = ({to,subject,body,time, onClick}) => {

    

    return (
        <div className="emailbody" onClick={onClick} >
            <div className="emailbody__left">
                <h4>{to}</h4>
            </div>
            <div className="emailbody__middle">
                <div className="emailbody__middle__msg">
                    <p><b>{subject}</b>{body}</p>
                </div>
            </div>

            <div className="emailbody__right">
                <p>{time}</p>
            </div>
        </div>
    )
};

export default EmailBody;