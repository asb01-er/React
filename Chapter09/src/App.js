import React, { Component } from 'react';
import User from './User';          // Component that lists users (READ + DELETE)
import UserForm from './UserForm';  // Form used for ADD and EDIT operations
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// 404 Component for invalid routes
class NotFound extends Component {
  render() {
    return <div>404 - Page Not Found</div>;
  }
}

class App extends Component {
  render() {
    return (
      // BrowserRouter wraps the entire app to enable routing
      <BrowserRouter>

        {/* 
          Switch renders ONLY the first matching <Route>.
          This avoids multiple components rendering for the same URL.
        */}
        <Switch>

          {/* 
            CREATE — Add new user 
            When visiting /add, load UserForm with empty fields.
          */}
          <Route exact path="/add" component={UserForm} />

          {/* 
            UPDATE — Edit user 
            :id is a route param (Firebase node key).
            UserForm will detect this and load existing data in componentDidMount.
          */}
          <Route exact path="/edit/:id" component={UserForm} />

          {/* 
            READ — Show list of users
            The User component fetches data from Firebase and displays it.
          */}
          <Route exact path="/" component={User} />

          {/* 
            If none of the above routes match, render the NotFound component.
          */}
          <Route component={NotFound} />

        </Switch>
      </BrowserRouter>
    );
  }
}

// Export App as the main container for routing and components
export default App;
