

import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Compose.css";
import { Base_URL } from "../../UI/Helper";


const Compose = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  // Multi-line content from editor as body
  const body = convertToRaw(editorState.getCurrentContent()).blocks
    .map((block) => block.text)
    .join("\n");

  const sendMail = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("to", to);
    formData.append("subject", subject);
    formData.append("body", body);
    if (file) {
      formData.append("file", file);
    }
    console.log(file);
    
    try {
      const response = await fetch(`${Base_URL}/api/v1/emails/send`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Failed to send mail";
        if (data && data.error) {
          errorMessage = data.error.message || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Mail sent successfully:", data);
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
    if (!to || !subject || !editorState.getCurrentContent().hasText()) {
      alert("Please fill out all fields before sending.");
      return;
    }
    sendMail();
    setTo("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
    setFile(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
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
        />
        <div className="file-input">
          <input
            type="file"
            onChange={handleFileChange}
            disabled={loading}
          />
          {file && <span>{file.name}</span>}
        </div>
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Send Email"}
      </button>
    </div>
  );
};

export default Compose;
