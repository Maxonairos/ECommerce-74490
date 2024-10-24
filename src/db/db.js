// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCHaYNXQdUrc7hSWaAauhm985mUJHuVfec",
    authDomain: "gamerstore-74490.firebaseapp.com",
    projectId: "gamerstore-74490",
    storageBucket: "gamerstore-74490.appspot.com",
    messagingSenderId: "975813769030",
    appId: "1:975813769030:web:8660973cb6f17a007e9747"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const db = getFirestore()

export default db;