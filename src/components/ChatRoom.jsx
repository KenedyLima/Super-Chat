import React, { useState } from "react";
import InputMessageField from "./InputMessageField";
import { getDocs, onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import {db} from "../firebase.config";
import { useEffect } from "react";

function ChatRoom({ sendMessageHandler, handleSignOut, docs, user }) {
  const userName = user.displayName;
  let setDocs;
  [docs, setDocs] = useState(docs);
  console.log(docs)
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

function dateComparator(array) {
  const resultArray = [];
  for(let i = 0; i < array.length; i++){
    const currentElement = array[i];
    for(let j = i; j < array.length; j++) {
      let smallerElement;
      let lastElementIndex;
      if(lastElementIndex) {

      }
      if(array[i] <= array[j]){
        resultArray[i] = array[i]
        lastElementIndex = i;
      } else {
        resultArray[i] = array[j];
        lastElementIndex = j;
      }


    }
  }
console.log("resultArray: ", resultArray);
}

dateComparator([5, 4, 3, 2, 1]);




export default ChatRoom;
