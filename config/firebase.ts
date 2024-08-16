// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
const apiKey= process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "flashtrack-69c97.firebaseapp.com",
  projectId: "flashtrack-69c97",
  storageBucket: "flashtrack-69c97.appspot.com",
  messagingSenderId: "775104198790",
  appId: "1:775104198790:web:28cbad3e7114db9fcc7907",
  measurementId: "G-4YK0XVN6J0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export {auth}