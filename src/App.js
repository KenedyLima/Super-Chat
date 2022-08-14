import "./stylesheets/App.css";
import React from "react";
import ChatRoom from "./components/ChatRoom";
import SignInButton from "./components/SignInButton";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc} from "firebase/firestore";
import {db, auth} from "./firebase.config";
import { trimUserName, updateMessageContainerScroll } from "./helperFunctions";

let user;
function App() {
  [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <section>
          {user ? (
            <ChatRoom
              sendMessageHandler={sendMessage}
              handleSignOut={logOut}    
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
}

async function sendMessage(message) {
  const userName = trimUserName(user.displayName);
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
  updateMessageContainerScroll();
}
export default App;
