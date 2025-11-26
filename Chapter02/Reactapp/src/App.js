import logo from './logo.svg';
import './App.css';
import Products from './Products'; // Import child component
import { Component } from 'react';

function App() {
  return (
    <div className="App">
      <h1>
        My First Ever React App!
      </h1>
      {/* Use custom component like an HTML tag */}
      <Products />
    </div>
  );
}

// class App extends Component {
//   formatName(user) {
//     return user.firstName + ' ' + user.lastName;
//   }
//   render() {
//     const user = {
//       firstName: 'Ernest',
//       lastName: 'Ekelem'
//     };
//     return (
//       <div>
//         <h1>Hello, {this.formatName(user)}</h1>
//       </div>
//     );
//   }
// }

export default App;
