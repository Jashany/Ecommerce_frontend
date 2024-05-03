// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbjMQggXXqKyWH4VzLlI-DvYhW3JqVYoY",
  authDomain: "dbms-project-9b2c3.firebaseapp.com",
  projectId: "dbms-project-9b2c3",
  storageBucket: "dbms-project-9b2c3.appspot.com",
  messagingSenderId: "312689180192",
  appId: "1:312689180192:web:9edeb7cd1b8cf8bbcec645"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)