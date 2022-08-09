import React from "react";
import { useEffect } from "react";

function InputMessageField({ sendMessageHandler }) {
  let message = "";
  console.log('rendering input')
  useEffect(() => {
    
    const button = document.querySelector(".send-message-button");
    const inputField = document.querySelector('.message-field');
    inputField.addEventListener("input", () => {message = document.querySelector('.message-field').value})
    inputField.addEventListener("keypress", (e) => {
      if(e.key === "Enter") {
        console.log('Message: ' + message)
        sendMessageHandler(message);
        inputField.value="";
      }
    })
    button.addEventListener("click", () => {
      console.log('Message: ' + message)
      sendMessageHandler(message);
      inputField.value=""
    });
  });
  return (
    <div className="send-message-field">
      <input placeholder="Send Message"  className="message-field" type="text" />
      <button type="submit" className="send-message-button">
        <ion-icon name="send"></ion-icon>
      </button>
    </div>
  );
}

export default InputMessageField;
