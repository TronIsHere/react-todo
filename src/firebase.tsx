// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEfwq7BWLSFUSPnDajMiqlp9G4cvUEXT8",
  authDomain: "react-todo-ts-72a5c.firebaseapp.com",
  databaseURL: "https://react-todo-ts-72a5c-default-rtdb.firebaseio.com",
  projectId: "react-todo-ts-72a5c",
  storageBucket: "react-todo-ts-72a5c.appspot.com",
  messagingSenderId: "280738664576",
  appId: "1:280738664576:web:ef48cb6d9a8e7add449665",
  measurementId: "G-4JN6D3P1RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);