import React from "react";
import { send } from "ionicons/icons";

function ChatRoom({ sendMessageHandler, handleSignOut }) {
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
      <div className="messages-container"></div>
      <div className="send-message-field">
        <input
          placeholder="Send Message"
          className="message-field"
          type="text"
        />
        <button
          type="submit"
          className="send-message-button"
          onClick={() => {
            sendMessageHandler(document.querySelector(".message-field").value);
          }}
        >
          <ion-icon name="send"></ion-icon>
        </button>
      </div>
    </div>
  );
}

function removePlaceholder() {}
export default ChatRoom;
