import "./stylesheets/App.css";
import React from "react";

import ChatRoom from "./components/ChatRoom";
import SignInButton from "./components/SignInButton";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseConfig from "./firebase.config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
auth.useDeviceLanguage();
let user;
function App() {
  user = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <section>
          {user ? (
            <ChatRoom sendMessageHandler={sendMessage} handleSignOut={logOut} />
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
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function logOut() {
  const result = await signOut(auth);
  console.log(result);
}

async function sendMessage(message) {
  const userName = trimUserName(user[0].displayName);

  try {
    const docRef = await addDoc(collection(db, "messages"), {
      first: userName.firstName,
      message: message,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function trimUserName(name) {
  const nameSplit = name.split(" ");
  return { firstName: nameSplit.slice(0) };
}
export default App;
