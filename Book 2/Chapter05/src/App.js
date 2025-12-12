import logo from './logo.svg';
import './App.css';
import Products from './Products'; // Import child component
import { Component } from 'react';
import { Button } from 'react-bootstrap';
import Rating from './Rating';
import JumboTronComponent from './JumboTronComponent';

function App() {
  return (
    <div>
      <JumboTronComponent>
        This is a long sentence, and I want to insert content into the
        jumbotron component from the outside.
      </JumboTronComponent>
      
    </div>
  );
}

export default App;



