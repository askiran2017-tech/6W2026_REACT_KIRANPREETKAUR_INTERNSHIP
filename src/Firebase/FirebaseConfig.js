// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import{getFirestore}from'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBksKjSr8Ali7cx8yX6JPjf74EKH9nREPk",
  authDomain: "internship-project-b7fda.firebaseapp.com",
  projectId: "internship-project-b7fda",
  storageBucket: "internship-project-b7fda.firebasestorage.app",
  messagingSenderId: "798751110809",
  appId: "1:798751110809:web:f21c8ce82f9d5465326a08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db=getFirestore(app);