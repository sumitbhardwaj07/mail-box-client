import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EmailList from "../Email/EmailList";

const AllMails = () => {
  const [emails, setEmails] = useState([]);
  const emailId = useSelector((state) => state.auth.email);

  useEffect(() => {
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
        const inboxEmails = Object.values(data1 || {});
        const sentEmails = Object.values(data2 || {});

        // Combining emails and filtering duplicates
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
    };

    fetchAllMails();
  }, [emailId]);

  return (
    <div>
      <h2>All Mails</h2>
      <EmailList emails={emails} />
    </div>
  );
};

export default AllMails;
