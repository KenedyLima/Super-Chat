import "./stylesheets/App.css";
import React, { useState } from "react";

import ChatRoom from "./components/ChatRoom";
import SignInButton from "./components/SignInButton";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, doc} from "firebase/firestore";
import {db, auth} from "./firebase.config";
import {useEffect} from "react"
import { getDocs, onSnapshot } from "firebase/firestore";
auth.useDeviceLanguage();
let user;
function App() {
  console.log('Rendering app');
  [user] = useAuthState(auth);
  const[docs, setDocs] = useState([]);
  
  useEffect(() => {

      async function loadMessages() {
        const data = await getDocs(collection(db, "messages"))
        setDocs(data.docs);
      }

      loadMessages();
      function updateMessages() {
        onSnapshot(collection(db, "messages"), function(messagesRef) {
          console.log("UPDATING>>>>>")
          setDocs(messagesRef);
        })
      }
      // updateMessages();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <section>
          {user ? docs && docs.length > 0 &&(
            <ChatRoom
              sendMessageHandler={sendMessage}
              handleSignOut={logOut}
              docs={docs}
              user={user}
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
  console.log("Adding doc........")
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
