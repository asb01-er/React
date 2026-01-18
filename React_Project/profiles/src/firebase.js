
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5ULgS4CZlqpLAOMVkDhDBTvVTcqoFP_c",
  authDomain: "profiles-9dd36.firebaseapp.com",
  databaseURL: "https://profiles-9dd36-default-rtdb.firebaseio.com",
  projectId: "profiles-9dd36",
  storageBucket: "profiles-9dd36.appspot.com",
  messagingSenderId: "396208936944",
  appId: "1:396208936944:web:c0c6c022e8e22eb29cef35"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);