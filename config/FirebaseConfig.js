// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.Expo_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adopt-f7fc2.firebaseapp.com",
  projectId: "pet-adopt-f7fc2",
  storageBucket: "pet-adopt-f7fc2.firebasestorage.app",
  messagingSenderId: "1080452245976",
  appId: "1:1080452245976:web:11ddb19388ab9dd88feaad",
  measurementId: "G-ME1DWXRVHL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//export const storage = getStorage(app);
//const analytics = getAnalytics(app);
