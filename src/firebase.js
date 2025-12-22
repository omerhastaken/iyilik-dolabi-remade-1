// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5xKq8lTUy119CvnIJerAl_e9YFx4jay0",
  authDomain: "iyilik-dolabim.firebaseapp.com",
  projectId: "iyilik-dolabim",
  storageBucket: "iyilik-dolabim.firebasestorage.app",
  messagingSenderId: "495484646487",
  appId: "1:495484646487:web:2367d3f8621d6adc941f12",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
