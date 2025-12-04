import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDwjMbkryALw2XKJtzjSvccIGIiwER1AdI",
  authDomain: "crud-app-37403.firebaseapp.com",
  projectId: "crud-app-37403",
  storageBucket: "crud-app-37403.firebasestorage.app",
  messagingSenderId: "616707199192",
  appId: "1:616707199192:web:db887c06b769ca755107ad",
  measurementId: "G-5NBNCWL46L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();