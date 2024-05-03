import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./EmailForm.module.css"; // Import the CSS module

const EmailForm = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSendEmail = async () => {
    setLoading(true);
    const body = JSON.stringify(convertToRaw(editorState.getCurrentContent()).blocks[0].text);
    console.log(body);
    try {
      const response = await fetch(
        "https://mail-box-client-3b0eb-default-rtdb.asia-southeast1.firebasedatabase.app/mails.json",
        {
          method: "POST",
          body: JSON.stringify({ recipient, subject, body }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        let errorMessage = "Failed to send mail";
        if (data && data.error) {
          errorMessage = data.error.message || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data);
      alert("Mail sent successfully!");
      setRecipient("");
      setSubject("");
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.emailFormContainer}>
      <div className={styles.inputField}>
        <label htmlFor="recipient">To</label>
        <input
          id="recipient"
          type="email"
          required
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient's Email"
          disabled={loading}
        />
      </div>
      <div className={styles.inputField}>
        <label htmlFor="subject"></label>
        <input
          id="subject"
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          disabled={loading}
        />
      </div>
      <div className={styles.editorContainer}>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName={styles.editorClassName}
          disabled={loading}
          required
        />
      </div>
      <button
        onClick={handleSendEmail}
        disabled={loading}
        className={loading ? styles.sendButtonDisabled : styles.sendButton}
      >
        {loading ? "Sending..." : "Send Email"}
      </button>
    </div>
    // </form>
  );
};

export default EmailForm;

// import React, { useState } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
// import { EditorState, convertToRaw } from 'draft-js';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// const EmailForm = () => {
//   const [recipient, setRecipient] = useState('');
//   const [subject, setSubject] = useState('');
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [loading, setLoading] = useState(false);

//   const onEditorStateChange = (editorState) => {
//     setEditorState(editorState);
//   };

//   const handleSendEmail = async () => {
//     setLoading(true);
//     const body = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
//     // console.log(body);
//     // console.log(editorState);
//     // console.log(editorState.getCurrentContent());
//     // console.log(convertToRaw(editorState.getCurrentContent()).blocks[0].text);

//     try {
//       const response = await fetch(
//         "https://mail-box-client-3b0eb-default-rtdb.asia-southeast1.firebasedatabase.app/mails.json",
//         {
//           method: "POST",
//           body: JSON.stringify({ recipient, subject, body }),
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (!response.ok) {
//         const data = await response.json();
//         let errorMessage = "Failed to send mail";
//         if (data && data.error) {
//           errorMessage = data.error.message || errorMessage;
//         }
//         throw new Error(errorMessage);
//       }

//       const data = await response.json(); // To process the response data further if needed
//       console.log(data);
//       alert("Mail sent successfully!");
//       setRecipient("");
//       setSubject("");
//       setEditorState(EditorState.createEmpty());
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={recipient}
//         onChange={(e) => setRecipient(e.target.value)}
//         placeholder="Recipient's Email"
//         disabled={loading}
//       />
//       <input
//         type="text"
//         value={subject}
//         onChange={(e) => setSubject(e.target.value)}
//         placeholder="Subject"
//         disabled={loading}
//       />
//       <Editor
//         editorState={editorState}
//         onEditorStateChange={onEditorStateChange}
//         toolbarClassName="toolbarClassName"
//         wrapperClassName="wrapperClassName"
//         editorClassName="editorClassName"
//         disabled={loading}
//       />
//       <button onClick={handleSendEmail} disabled={loading}>
//         {loading ? 'Sending...' : 'Send Email'}
//       </button>
//     </div>
//   );
// };

// export default EmailForm;
