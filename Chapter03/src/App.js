import logo from './logo.svg';
import './App.css';
import Products from './Products'; // Import child component
import { Component } from 'react';
import { Button } from 'react-bootstrap';
import Rating from './Rating';

function App() {
  const isValid = false;
  return (
    <div>
       <h1>
         React App!
       </h1>
       <br></br>
      <Products />
      {/* Bootstrap Button - disabled when isValid = true */}
      <Button variant="primary" disabled={isValid}>Default</Button>

      <hr></hr>
    {/* Rendering Rating components with different initial ratings */}
      <Rating rating="1" />
      <Rating rating="2" />
      <Rating rating="3" />
      <Rating rating="4" />
      <Rating rating="5" />
    </div>
  );
}

export default App;



