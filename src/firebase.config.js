import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB7SPQChPwqgZbnkfjdqvUu59G_-5waV04",
  authDomain: "super-chat-4a393.firebaseapp.com",
  projectId: "super-chat-4a393",
  storageBucket: "super-chat-4a393.appspot.com",
  messagingSenderId: "721068686303",
  appId: "1:721068686303:web:7d75a375a09c79603e626a",
  measurementId: "G-2459RYJ4L2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


