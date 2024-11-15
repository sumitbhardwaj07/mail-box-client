import React from 'react';
import EmailBody from './ReceivedMails.js/EmailBody';
import { useNavigate } from 'react-router-dom';


const EmailList = ({ emails, deleteHandler }) => {
  const navigate = useNavigate();

  //console.log(emails);

  const handleEmailClick = (email) => {
    
    navigate('/emaildetail', { state: email});
  };

  

  return (
    <div>
      {emails.length === 0 ? (
        <p>No email to display.</p>
      ) : 
      (emails.map(email => (
        <EmailBody 
        key={email._id}
        id={email._id}
        to={email.to}
        subject={email.subject}
        body={email.body}
        time={email.time}
        isRead={email.isRead}
        type={email.type}
        attachment={email.attachment}
        deleteHandler={(e)=> deleteHandler(e,email._id)}
        onClick={() => handleEmailClick(email)} 
        />
      )))
      }
    
    </div>
  );
};

export default EmailList;
