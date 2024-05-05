import React from 'react';
import EmailBody from './ReceivedMails.js/EmailBody';
import { useNavigate } from 'react-router-dom';


const EmailList = ({ emails }) => {
    const navigate = useNavigate();

  const handleEmailClick = (email) => {
    navigate('/emaildetail', { state: email})
  };

  return (
    <div>
      {emails.map(email => (
        <EmailBody
          key={email.id}
          to={email.to}
          subject={email.subject}
          body={email.body}
          time={email.time}
          onClick={() => handleEmailClick(email)}
        />
      ))}

      {/* {selectedEmail && (
        <EmailDetail
          name={selectedEmail.name}
          subject={selectedEmail.subject}
          time={selectedEmail.time}
          body={selectedEmail.body}
        />
      )} */}
    </div>
  );
};

export default EmailList;
