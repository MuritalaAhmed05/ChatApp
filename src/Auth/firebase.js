// firebase.js
import { initializeApp } from "firebase/app"; // Import Firebase app initialization
import { getAuth } from "firebase/auth";      // Import Firebase auth service
import { getFirestore } from "firebase/firestore";  // Import Firebase Firestore

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7JQ6unEPo1rcpaSN6JRHX6NYU1lxQCAE",
    authDomain: "realtime-chat-app-af46e.firebaseapp.com",
    projectId: "realtime-chat-app-af46e",
    storageBucket: "realtime-chat-app-af46e.appspot.com",
    messagingSenderId: "335715957886",
    appId: "1:335715957886:web:9e299246a2ff5e6fda2c2f",
    measurementId: "G-9HRY9XJQLL"
  };

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // Pass 'app' to getAuth
const firestore = getFirestore(app); // Pass 'app' to getFirestore

// Export the services to use in your app
export { auth, firestore };
