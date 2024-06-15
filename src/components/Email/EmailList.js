import React from 'react';
import EmailBody from './ReceivedMails.js/EmailBody';
import { useNavigate } from 'react-router-dom';


const EmailList = ({ emails, deleteHandler }) => {
  const navigate = useNavigate();

  const handleEmailClick = (email) => {
    navigate('/emaildetail', { state: email});
  };

  

  return (
    <div>
      {emails.map(email => (
        <EmailBody
          key={email.id}
          emailId={email.id}
          to={email.to}
          subject={email.subject}
          body={email.body}
          time={email.time}
          isRead={email.isRead}
          deleteHandler={(e)=> deleteHandler(e,email.id)}
          onClick={() => handleEmailClick(email)}
        />
      ))}

    </div>
  );
};

export default EmailList;
