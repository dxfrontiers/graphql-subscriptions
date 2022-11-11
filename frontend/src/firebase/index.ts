// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut as signOutInternal } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKc4NUY2aRVv-XYFhpAwLyNywUKBWikps",
  authDomain: "quacker-4dbc8.firebaseapp.com",
  projectId: "quacker-4dbc8",
  storageBucket: "quacker-4dbc8.appspot.com",
  messagingSenderId: "321142739041",
  appId: "1:321142739041:web:6b1ef1aa2d35cfd69a1a20",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const signOut = () => signOutInternal(firebaseAuth);
