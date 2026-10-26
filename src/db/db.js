// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// The Firebase web API key is public by design. These values can be overridden
// through environment variables (see .env.example) without changing the code.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCHaYNXQdUrc7hSWaAauhm985mUJHuVfec",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "gamerstore-74490.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "gamerstore-74490",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "gamerstore-74490.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "975813769030",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:975813769030:web:8660973cb6f17a007e9747"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore()

export default db;
