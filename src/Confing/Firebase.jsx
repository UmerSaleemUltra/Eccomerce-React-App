// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCstb362SmC2QZlX6qKLPTBI1k9cYYFKd8",
  authDomain: "authentication-expertizo.firebaseapp.com",
  projectId: "authentication-expertizo",
  storageBucket: "authentication-expertizo.appspot.com",
  messagingSenderId: "630157219037",
  appId: "1:630157219037:web:af5e93f5fa5e52efb1b734",
  measurementId: "G-S2F2WL66K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);