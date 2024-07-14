import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCstb362SmC2QZlX6qKLPTBI1k9cYYFKd8",
  authDomain: "authentication-expertizo.firebaseapp.com",
  projectId: "authentication-expertizo",
  storageBucket: "authentication-expertizo.appspot.com",
  messagingSenderId: "630157219037",
  appId: "1:630157219037:web:af5e93f5fa5e52efb1b734",
  measurementId: "G-S2F2WL66K6"};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
