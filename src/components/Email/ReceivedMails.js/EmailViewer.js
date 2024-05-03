import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EmailViewer = ({emailId}) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //const emailId = useSelector((state) => state.auth.email);
  //const state = localStorage.getItem('authState');
  //console.log(state);
  //const email = state.email;
  //console.log(email);

  //console.log(emailId);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(
          `https://mail-box-client-3b0eb-default-rtdb.asia-southeast1.firebasedatabase.app/mails.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }
        const data = await response.json();
        //console.log(data);
        const emailsArray = Object.keys(data)
          .map((key) => ({
            id: key,
            recipient: data[key].recipient,
            body: data[key].body,
            date: data[key].date,
            subject: data[key].subject,
          }))
          .filter((email) => email.recipient === emailId); // Filtering emails based on recipient
        setEmails(emailsArray);
        console.log(emailsArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [emailId]);

  if (loading) {
    return <div>Loading emails, please wait...</div>;
  }

  if (error) {
    return <div>Error loading emails: {error}</div>;
  }

  if (emails.length === 0) {
    return <div>No emails found for {emailId}. Please check back later.</div>;
  }

  return (
    <div className="email">
      {emails.map((email) => (
        <div key={email.id}>
          <h3>{email.subject}</h3>
          <h4>Recipient: {email.recipient}</h4>
          <p>Body: {email.body}</p>
        </div>
      ))}
    </div>
  );
};

export default EmailViewer;
