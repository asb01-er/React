// Import React to enable JSX and component creation
import React from 'react';

// Import the Products component so it can be used inside App
import Products from './Products';

// Helper function to format and return a user's full name
// It receives a user object and combines firstName and lastName
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

// Root functional component of the application
function App() {

  // Object holding user data
  // This data will be used inside JSX
  const user = {
    firstName: 'Ernest',
    lastName: 'Ekelem',
    imageUrl: 'https://picsum.photos/200/300'
  };

  // JSX returned here controls what is rendered in the browser
  return (
    <div>
      <h1>
        {/* Embed a JavaScript expression inside JSX using curly braces */}
        {/* formatName(user) is called and its result is displayed */}
        Hello, {formatName(user)}

        {/* Line break in JSX */}
        <br />

        {/* Display user image using dynamic src from user object */}
        {/* JSX uses {} to inject JavaScript values */}
        <img src={user.imageUrl} alt="User" />
      </h1>

      {/* Render the Products component */}
      {/* This shows the Products UI inside the App component */}
      <Products />
    </div>
  );
}

// Export App so it can be rendered by index.js
export default App;
