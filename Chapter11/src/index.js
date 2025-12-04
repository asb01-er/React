import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import cartReducer from "./reducer";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';

// Create Redux store
var store = createStore(cartReducer);

// Get the root DOM element
var destination = document.querySelector("#container");

// Create React root
const root = ReactDOM.createRoot(destination);

// Render app
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
