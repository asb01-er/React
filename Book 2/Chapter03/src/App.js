import logo from './logo.svg';
import './App.css';
import Products from './Products';
import { Component } from 'react';
import { Button } from 'react-bootstrap';
import Rating from './Rating';

function App() {

  // Boolean used to control component behavior (button state)
  const isValid = false;

  return (
    <div>

      {/* Main application heading */}
      <h1>React Hooks App!</h1>

      <br />

      {/* Render list of products */}
      <Products />

      {/* 
        Button behavior is controlled by JavaScript logic
        If isValid is true → button is disabled
        If isValid is false → button is enabled
      */}
      <Button variant="danger" disabled={isValid}>
        Default
      </Button>

      <hr />

      {/* 
        Passing different values to the same component using props
        Each Rating component works independently
      */}
      <Rating rating="1" />
      <Rating rating="2" />
      <Rating rating="3" />
      <Rating rating="4" />
      <Rating rating="5" />

    </div>
  );
}

export default App;
