import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import firebase from "firebase";          // Import Firebase v8 SDK
import "firebase/database";               // Import Realtime Database module

// =========================
// Firebase Configuration
// =========================
// This object contains project credentials generated from Firebase Console.
// It allows your React app to connect to your Firebase project.
const firebaseConfig = {
  apiKey: "AIzaSyDwjMbkryALw2XKJtzjSvccIGIiwER1AdI",
  authDomain: "crud-app-37403.firebaseapp.com",
  projectId: "crud-app-37403",
  storageBucket: "crud-app-37403.appspot.com",
  messagingSenderId: "616707199192",
  appId: "1:616707199192:web:db887c06b769ca755107ad",
  measurementId: "G-5NBNCWL46L"
};

// =========================
// Initialize Firebase v8
// =========================
// This bootstraps Firebase in your React application.
// After initializing, firebase.database() becomes available for CRUD operations.
firebase.initializeApp(firebaseConfig);

// =========================
// Render Main Application
// =========================
// ReactDOM.render() mounts the App component into the HTML root element.
// This is the entry point of the entire React application.
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
