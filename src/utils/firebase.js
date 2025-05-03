// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnPbWTUowG_LV-EimuPojTTUbJ3JrVT1o",
  authDomain: "netflix-gpt-2807b.firebaseapp.com",
  projectId: "netflix-gpt-2807b",
  storageBucket: "netflix-gpt-2807b.firebasestorage.app",
  messagingSenderId: "878307760696",
  appId: "1:878307760696:web:ac50468ba52d50ff1ce4cd",
  measurementId: "G-BD8RK3S6EP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);