import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EmailList from "../Email/EmailList";
import { Base_URL } from "../../UI/Helper";


const AllMails = () => {
  const [emails, setEmails] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const fetchAllMails = async () => {
    
      const response1 = await fetch(
        `${Base_URL}/api/v1/emails/inbox`,{
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
             credentials: "include"
        },
        
      });
    const response2 = await fetch(
      `${Base_URL}/api/v1/emails/sent`,{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
           credentials: "include"
      },
      
    });

    if (response1.ok && response2.ok) {
      const data1 = await response1.json();
      const data2 = await response2.json();
      const inboxEmails = Object.entries(data1.data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      const sentEmails = Object.entries(data2.data).map(([key, value]) => ({
        id: key,
        ...value,
      }));

      
      const combinedEmails = [...inboxEmails, ...sentEmails];
      const uniqueEmails = combinedEmails.reduce((acc, current) => {
        const uniqueKey = `${current.from}-${current.subject}-${current.timestamp}`; // Composite key
        if (
          !acc.some(
            (item) =>
              `${item.from}-${item.subject}-${item.timestamp}` === uniqueKey
          )
        ) {
          acc.push(current);
        }
        return acc;
      }, []);

      setEmails(uniqueEmails);
    }
    else {
      alert('Failed to fetch data.Please try again')
    }
  };
  useEffect(() => {
    fetchAllMails();
  }, []);

  const deleteHandler = async (e, id) => {
    e.stopPropagation();


    const response1 = await fetch(
      `${Base_URL}/api/v1/emails/inbox/${id}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, // Correctly set the header
           credentials: "include"
      },
      
    }
    );
    const response = await fetch(
      `${Base_URL}/api/v1/emails/sent/${id}`,{
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, // Correctly set the header
           credentials: "include"
      },
      
    });

    if (!response.ok) {
      throw new Error("Failed to delete the email");
    }
    if (!response1.ok) {
      throw new Error("Failed to delete the email");
    }
    fetchAllMails();
    
  };

  return (
    <div>
      <h2>All Mails</h2>
      <EmailList emails={emails} deleteHandler={deleteHandler} />
    </div>
  );
};

export default AllMails;