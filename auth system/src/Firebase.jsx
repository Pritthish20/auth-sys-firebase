// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiKpAGgShjg5nTSWU_Jq4aTV3d-kU1q2k",
  authDomain: "auth-sys-8697d.firebaseapp.com",
  projectId: "auth-sys-8697d",
  storageBucket: "auth-sys-8697d.firebasestorage.app",
  messagingSenderId: "741211713933",
  appId: "1:741211713933:web:a7f4bf176e8c0538fa8dc4",
  measurementId: "G-0DZ1F3SD6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(app);
const authDB = getAuth(app)
const googleAuthDB = new GoogleAuthProvider()
export {firebaseDB,authDB,googleAuthDB} ;