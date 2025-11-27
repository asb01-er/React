import logo from './logo.svg';
import './App.css';
import Products from './Products'; // Import child component
import { Component } from 'react';
import { Button } from 'react-bootstrap';
import Rating from './Rating';

function App() {
  const isValid = true;
  return (
    <div>
      <Products />
    </div>
  );
}

export default App;



