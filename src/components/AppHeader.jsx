import React from "react";

export function AppHeader({ handleSignOut }) {
  return (
    <div className="chat-header">
      <img
        src={require("../image/OIP.png")}
        className="chat-image"
        alt="no-profile-image"
      ></img>
      <h1 className="chat-name">Super Chat</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
