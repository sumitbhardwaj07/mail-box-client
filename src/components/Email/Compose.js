import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import "./Compose.css";
import { useNavigate } from "react-router-dom";

const Compose = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const emailId = useSelector((state) => state.auth.email);
  const navigate = useNavigate();

  const body = JSON.stringify(
    convertToRaw(editorState.getCurrentContent()).blocks[0].text
  );

  const sendMailFrom = async () => {
    setLoading(true);
  

    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0"); 
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    console.log(formattedTime);
    const msgObj = {
      to: to,
      from: emailId,
      subject: subject,
      body: body,
      time: formattedTime
    };

    const dummyEmail = emailId
      .toLowerCase()
      .split("")
      .filter((e) => e.charCodeAt(0) >= 97 && e.charCodeAt(0) <= 122)
      .join("");

    try {
      const response = await fetch(
        `https://mail-box-client-3b0eb-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/sentMails.json`,
        {
          method: "POST",
          body: JSON.stringify(msgObj),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Failed to send mail";
        if (data && data.error) {
          errorMessage = data.error.message || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json(); 
      console.log(data);
      alert("Mail sent successfully!");
      

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };


  

  const sendMailTo = async () => {

    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0"); 
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    const msgObj = {
      to: to,
      from: emailId,
      subject: subject,
      body: body,
      time: formattedTime,
      isRead: false,
    };
    const dummyEmail = to
      .toLowerCase()
      .split("")
      .filter((e) => e.charCodeAt(0) >= 97 && e.charCodeAt(0) <= 122)
      .join("");

    try {
      const response = await fetch(
        `https://mail-box-client-3b0eb-default-rtdb.asia-southeast1.firebasedatabase.app/${dummyEmail}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify(msgObj),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Failed to send mail";
        if (data && data.error) {
          errorMessage = data.error.message || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json(); 
      console.log(data);
      alert("Mail sent successfully!");
      

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    sendMailFrom();
    sendMailTo();
    setTo("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
  };

  return (
    <div className="gmail-email-form">
      <div className="new-message-header">
        <span>New Message</span>
        <button onClick={handleClose}>Close</button>
      </div>
      <div className="email-inputs">
        <input
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Recipient's Email"
          disabled={loading}
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          disabled={loading}
        />
      </div>
      <div className="editor-wrapper">
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="editor-wrapper"
          editorClassName="editorClassName"
          toolbarClassName="toolbarClassName"
          disabled={loading}
          required
        />
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Send Email"}
      </button>
    </div>
  );
};

export default Compose;
