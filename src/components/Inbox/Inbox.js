// Inbox.js
import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import EmailList from "../Email/EmailList";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const emailId = useSelector((state) => state.auth.email);

  useEffect(() => {
    const fetchInbox = async () => {
      const dummyEmail = emailId
        .toLowerCase()
        .split("")
        .filter((e) => e.charCodeAt(0) >= 97 && e.charCodeAt(0) <= 122)
        .join("");
      const response = await fetch(
        `https://mail-box-client-3b0eb-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/inbox.json`
      );
      if (response.ok) {
        const data = await response.json();
        
        
        const emailsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setEmails(emailsArray);
      }
    };

    fetchInbox();
  }, []);
  
  const deleteHandler = async (e,id) => {
    e.stopPropagation();
    
    const dummyEmail =emailId
    .toLowerCase()
    .split("")
    .filter((e) => e.charCodeAt(0) >= 97 && e.charCodeAt(0) <= 122)
    .join("");

    try {
        const response = await fetch(
          `https://mail-box-client-3b0eb-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/inbox/${id}.json`,
          {
            method: "DELETE"
          }
        );
    
        if (!response.ok) {
          throw new Error('Failed to delete the email');
        }
    
        alert('Email deleted successfully!');
      } catch (error) {
        alert(error.message);
      };

};

  return (
    <div>
      <h2>Inbox</h2>
      <EmailList emails={emails} deleteHandler={deleteHandler}/>
    </div>
  );
};

export default Inbox;
