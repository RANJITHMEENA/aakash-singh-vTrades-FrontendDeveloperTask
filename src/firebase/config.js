// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKZy6ucjOf9RZRu39jZ611du86Om0bZJw",
    authDomain: "vtrades-e8811.firebaseapp.com",
    projectId: "vtrades-e8811",
    storageBucket: "vtrades-e8811.firebasestorage.app",
    messagingSenderId: "221246294873",
    appId: "1:221246294873:web:86251f111b2176becf1a48",
    measurementId: "G-7P7RXCY3Q2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth }; 