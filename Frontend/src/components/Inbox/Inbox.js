import React, { useState, useEffect } from "react";
import { setCount } from "../../store/mailReducer";
import { useDispatch, useSelector } from "react-redux";
import EmailList from "../Email/EmailList";
import { Base_URL } from "../../UI/Helper";



const Inbox = () => {
  const [emails, setEmails] = useState([]);
  
  const dispatch = useDispatch();
  const token = useSelector((state)=> state.auth.token)

  const fetchInbox = async () => {
    
    const response = await fetch(
      `${Base_URL}/api/v1/emails/inbox`,{
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
        ...value,
      }));
      setEmails(emailsArray);
      //console.log(emails)
    }
    else {
      alert('Failed to fetch data.Please try again ')
    }
  };
  useEffect(() => {
    fetchInbox();
  }, []);

  const deleteHandler = async (e, id) => {
    e.stopPropagation();
    console.log(id)

    
    try {
      const response = await fetch(
        `${Base_URL}/api/v1/emails/${id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`, // Correctly set the header
             credentials: "include"
        },
        
      }
    );

      if (!response.ok) {
        throw new Error("Failed to delete the email");
      }

      alert("Email deleted successfully!");
      fetchInbox();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const unreadEmailsCount = emails.filter((email) => email.isRead === false).length;

    dispatch(setCount(unreadEmailsCount));
  }, [emails, dispatch]);

  return (
    <div>
      <h2>Inbox</h2>
      <EmailList emails={emails} deleteHandler={deleteHandler} />
    </div>
  );
};

export default Inbox;