import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EmailList from "../Email/EmailList";

const AllMails = () => {
  const [emails, setEmails] = useState([]);
  const emailId = useSelector((state) => state.auth.email);

  const fetchAllMails = async () => {
    const dummyEmail = emailId
      .toLowerCase()
      .split("")
      .filter((e) => e.charCodeAt(0) >= 97 && e.charCodeAt(0) <= 122)
      .join("");
    const response1 = await fetch(
      `https://mail-box-client-3b0eb-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/inbox.json`
    );
    const response2 = await fetch(
      `https://mail-box-client-3b0eb-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/sentMails.json`
    );

    if (response1.ok && response2.ok) {
      const data1 = await response1.json();
      const data2 = await response2.json();
      const inboxEmails = Object.entries(data1).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      const sentEmails = Object.entries(data2).map(([key, value]) => ({
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

    const dummyEmail = emailId
      .toLowerCase()
      .split("")
      .filter((e) => e.charCodeAt(0) >= 97 && e.charCodeAt(0) <= 122)
      .join("");

    const response1 = await fetch(
      `https://mail-box-client-3b0eb-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/inbox/${id}.json`,
      {
        method: "DELETE",
      }
    );
    const response = await fetch(
      `https://mail-box-client-3b0eb-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/sentMails/${id}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
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