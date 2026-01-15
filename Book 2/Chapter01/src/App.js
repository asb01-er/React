// Import React so we can create React components and use JSX
import React from 'react';

// Main functional component of the application
// This is the root component that controls what is displayed on the page
function App() {

  // The return statement defines what the UI should look like
  // JSX is used here (HTML-like syntax inside JavaScript)
  return (
    <div>
      {/* Main heading displayed in the browser */}
      <h1>
        Learn React
      </h1>
    </div>
  );
}

// Export the App component so it can be used in index.js
export default App;
