import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBcqN9_n-UaZKseouul2akVMkuANlWMTyA",
  authDomain: "ap-advanced-redux-app.firebaseapp.com",
  projectId: "ap-advanced-redux-app",
  storageBucket: "ap-advanced-redux-app.appspot.com",
  messagingSenderId: "67577388700",
  appId: "1:67577388700:web:412deb15cf9c60f82d5759",
  measurementId: "G-SG25XN6SNR"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
0