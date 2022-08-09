import React, { useState } from "react";
import InputMessageField from "./InputMessageField";
import { getDocs, onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import {db} from "../firebase.config";
import { useEffect } from "react";
let docs = [];
function ChatRoom({ sendMessageHandler, handleSignOut }) {
  console.log("rendering chat");
  console.log(docs);
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
   
      </div>
      <InputMessageField sendMessageHandler={sendMessageHandler} />
    </div>
  );
}

export function updateMessages(db) {
  const unsub = onSnapshot(collection(db, "messages"), (messagesRef) => {
    docs = messagesRef.docs;
    console.log(docs)
  })
}



export default ChatRoom;
