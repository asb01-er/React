import React, { Component } from 'react';
import User from './User';
import UserForm from './UserForm';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// 404 Component
class NotFound extends Component {
  render() {
    return <div>404 - Page Not Found</div>;
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>

          {/* Add User */}
          <Route exact path="/add" component={UserForm} />

          {/* Edit User */}
          <Route exact path="/edit/:id" component={UserForm} />

          {/* Home */}
          <Route exact path="/" component={User} />

          {/* 404 fallback */}
          <Route component={NotFound} />

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
