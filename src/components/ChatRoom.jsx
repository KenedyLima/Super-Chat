import React, { useState } from "react";
import InputMessageField from "./InputMessageField";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.config";
import { updateMessageContainerScroll } from "../App";

function ChatRoom({ sendMessageHandler, handleSignOut, user }) {


  const userName = user.displayName;
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("date", "asc"))
    const unsubscribe = onSnapshot(q, (ref) => {
      setDocs(ref.docs);
    })

  }, [])
  
  return (
    <div className="chat">
      <div className="chat-header">
        <img
          src={require("../image/OIP.png")}
          className="chat-image"
          alt="no-profile-image"
        ></img>
        <h1 className="chat-name">Super Chat</h1>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className="messages-container">
      {docs.length > 0 ? docs.map((doc, index) => {
        const date = doc.data().date.toDate();
  
        return <div key={index}  className={userName === doc.data().name ? "message-wrapper user-message": "message-wrapper others-message"}><div className="author-time-wrapper"><span className="message-author">{doc.data().name}</span> <span className="message-time">{date.getHours()}:{date.getMinutes()}</span></div><p className="message">{doc.data().message}</p></div>

      }) : "No messages yet!"}
      </div>
      <InputMessageField sendMessageHandler={sendMessageHandler} />
    </div>
  );
}

export default ChatRoom;
