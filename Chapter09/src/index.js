import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import firebase from "firebase";
import "firebase/database"; // if your app uses database (likely yes)

// Firebase v8 Config
const firebaseConfig = {
  apiKey: "AIzaSyDwjMbkryALw2XKJtzjSvccIGIiwER1AdI",
  authDomain: "crud-app-37403.firebaseapp.com",
  projectId: "crud-app-37403",
  storageBucket: "crud-app-37403.appspot.com",
  messagingSenderId: "616707199192",
  appId: "1:616707199192:web:db887c06b769ca755107ad",
  measurementId: "G-5NBNCWL46L"
};

// Initialize Firebase v8
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
