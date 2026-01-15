
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5ULgS4CZlqpLAOMVkDhDBTvVTcqoFP_c",
  authDomain: "profiles-9dd36.firebaseapp.com",
  projectId: "profiles-9dd36",
  storageBucket: "profiles-9dd36.firebasestorage.app",
  messagingSenderId: "396208936944",
  appId: "1:396208936944:web:f3bb0d7dca0d738b9cef35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);