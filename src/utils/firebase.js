// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4pN8VJ7dRsD4IVczUNmXAcFqYshFo0M4",
  authDomain: "netflix-c1e80.firebaseapp.com",
  projectId: "netflix-c1e80",
  storageBucket: "netflix-c1e80.firebasestorage.app",
  messagingSenderId: "865064305684",
  appId: "1:865064305684:web:c54de16f7cc3ab8a341301",
  measurementId: "G-XJ825WDJ0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();