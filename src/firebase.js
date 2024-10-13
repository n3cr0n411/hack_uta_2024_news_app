// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
// Remove getAnalytics if you're not using Firebase Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnNlYp06pJXkf-pmMHCa96RSEgJ3WOOnk",
  authDomain: "news-app-84ae5.firebaseapp.com",
  projectId: "news-app-84ae5",
  storageBucket: "news-app-84ae5.appspot.com",
  messagingSenderId: "962357493934",
  appId: "1:962357493934:web:05ce0bfa595f67817aed3f",
  measurementId: "G-0S3WCQRJMB" // This is optional unless you're using Firebase Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it for use in the app
const auth = getAuth(app);

// Export the auth object so it can be used in your components (e.g., Login and Register)
export { auth };
