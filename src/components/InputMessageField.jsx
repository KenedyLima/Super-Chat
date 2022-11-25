import React from "react";
import { useEffect } from "react";
import { updateMessageContainerScroll } from "../App";

function InputMessageField({ sendMessageHandler }) {
  let message = "";
  console.log('rendering input')
  useEffect(() => {
    console.log("Running useEffect in Input component")  
    const button = document.querySelector(".send-message-button");
    const inputField = document.querySelector('.message-field');
    updateMessageContainerScroll();
    inputField.addEventListener("input", () => {message = document.querySelector('.message-field').value})
    
    inputField.addEventListener("keypress", (e) => {
   
      if(e.key === "Enter" && message !== "") {
     
        console.log('Enter Listener Message: ' + message)
        sendMessageHandler(message);
        inputField.value="";
      }
    })
    button.addEventListener("click", () => {
      console.log('Click Listener Message: ' + message)
      sendMessageHandler(message);
      inputField.value=""
    });
  }, []);


  return (
    <div className="send-message-field">
      <input placeholder="Type Message"  className="message-field" type="text" />
      <button type="submit" className="send-message-button">
        <ion-icon name="send"></ion-icon>
      </button>
    </div>
  );
}

export default InputMessageField;
