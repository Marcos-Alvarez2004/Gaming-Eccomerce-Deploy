// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRABASE_KEY,
  authDomain: "gaming-eccomerce.firebaseapp.com",
  projectId: "gaming-eccomerce",
  storageBucket: "gaming-eccomerce.appspot.com",
  messagingSenderId: "836369809598",
  appId: "1:836369809598:web:75c90b5c3c0bf02996deef",
  measurementId: "G-4DSSBZYWKL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
