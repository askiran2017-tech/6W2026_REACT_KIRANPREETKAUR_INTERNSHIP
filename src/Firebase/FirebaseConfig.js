// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import{getFirestore}from'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPQIm30aPfTm1N30GCaZqqz9mK1y2BTfU",
  authDomain: "react-firebase-10-12-d8b8f.firebaseapp.com",
  projectId: "react-firebase-10-12-d8b8f",
  storageBucket: "react-firebase-10-12-d8b8f.firebasestorage.app",
  messagingSenderId: "128907960636",
  appId: "1:128907960636:web:ecf05af09ef036e2fcbe39"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db=getFirestore(app);