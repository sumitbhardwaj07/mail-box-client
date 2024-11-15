
import React, { useState, useEffect } from "react";

import EmailList from "../Email/EmailList";
import { useSelector } from "react-redux";
import { Base_URL } from "../../UI/Helper";

const Sent = () => {
  const [emails, setEmails] = useState([]);
  const token = useSelector((state) => state.auth.token);
  

  const fetchSentEmails = async () => {
    
    const response = await fetch(
      `${Base_URL}/api/v1/emails/sent`,{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Correctly set the header
           credentials: "include"
      },
      
    });
    if (response.ok) {
      const data = await response.json();
      //console.log(data);

      const emailsArray = Object.entries(data.data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      setEmails(emailsArray);
    }
    else {
      alert('Failed to fetch data.Please try again ')
    }
  };
  useEffect(() => {
    fetchSentEmails();
  }, []);

  const deleteHandler = async (e, id) => {
    e.stopPropagation();

    
    try {
      const response = await fetch(
        `${Base_URL}/api/v1/emails/${id}`,{
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`, // Correctly set the header
             credentials: "include"
        },
        
      });
      if (!response.ok) {
        throw new Error("Failed to delete the email");
      }
      fetchSentEmails();
      alert("Email deleted successfully!");
    } catch (error) {
      alert(error.message);
    }
  };
  //console.log(emails);

  return (
    <div>
      <h2>Sent</h2>

      <EmailList emails={emails} deleteHandler={deleteHandler} />
    </div>
  );
};

export default Sent;
