import "./stylesheets/App.css";
import React, { useState } from "react";

import ChatRoom, { loadMessages } from "./components/ChatRoom";
import SignInButton from "./components/SignInButton";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc} from "firebase/firestore";
import {db, auth} from "./firebase.config";
import { updateMessages } from "./components/ChatRoom";
import {useEffect} from "react"
import { getDocs } from "firebase/firestore";
auth.useDeviceLanguage();
let user;
function App() {
  console.log('Rendering app');
  [user] = useAuthState(auth);
  const[messages, setMessages] = useState([]);
  
  useEffect(() => {
    try{

      const data = getDocs(collection(db, "messages")).then(data => setMessages(data.docs));
    } catch(e) {
      console.error(e);
    }
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <section>
          {user ? (
            <ChatRoom
              sendMessageHandler={sendMessage}
              handleSignOut={logOut}
            />
          ) : (
            <SignInButton clickHandler={signIn} />
          )}
          
        </section>
      </header>
    </div>
  );

}


async function signIn() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
  }
}

async function logOut() {
  const result = await signOut(auth);
  console.log(result);
}

async function sendMessage(message) {
  const userName = user.displayName;

  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name: userName,
      message: message,
      date: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



export default App;
