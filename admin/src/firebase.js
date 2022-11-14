// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = { 
  apiKey: "AIzaSyC8aiZNBtd16Ma0ucUfinxRXfrkc0PD8Zc",
  authDomain: "emart-1bfe1.firebaseapp.com",
  projectId: "emart-1bfe1",
  storageBucket: "emart-1bfe1.appspot.com",
  messagingSenderId: "130064813806",
  appId: "1:130064813806:web:2403ad8b32782d0004adff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app