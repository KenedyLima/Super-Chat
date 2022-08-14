import React, { useState } from "react";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.config";
import { cleanMessageField, trimUserName, updateMessageContainerScroll
 } from "../helperFunctions";

function ChatRoom({ sendMessageHandler, handleSignOut, user }) {
  
  const userName = trimUserName(user.displayName);
 
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    // Update messages collection

    const q = query(collection(db, "messages"), orderBy("date", "asc"))
    // const unsubscribe = onSnapshot(q, (ref) => {
    //   setDocs(ref.docs);
      
    // })

    const button = document.querySelector(".send-message-button");
    const inputField = document.querySelector('.message-field');
    let message = "";

    // addEventListeners
    inputField.addEventListener("input", () => {message = document.querySelector('.message-field').value})
    inputField.addEventListener("keypress", (e) => {
   
      if(e.key === "Enter" && message !== "") {
      sendMessageHandler(message);
        cleanMessageField();
      }
    })
    button.addEventListener("click", () => {
      sendMessageHandler(message);
      cleanMessageField();
    });
  }, [])

  useEffect(() => {
    updateMessageContainerScroll();
  })

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

      }) : ""}
      </div>
      <div className="send-message-field">
      <input placeholder="Type Message"  className="message-field" type="text" />
      <button type="submit" className="send-message-button">
        <ion-icon name="send"></ion-icon>
      </button>
    </div>
    </div>
  );
}

export default ChatRoom;
