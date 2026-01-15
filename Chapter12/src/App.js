import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import useFetch from './useFetch';  // Custom hook for fetching data
import Users from './User';         // Component that displays all users

const App = () => {

  // API endpoints
  const postsUrl = "https://jsonplaceholder.typicode.com/posts";
  const todosUrl = "https://jsonplaceholder.typicode.com/todos";

  // This state holds the URL the user requested (posts or todos)
  const [requested, setRequested] = useState(postsUrl);

  // useFetch() automatically fetches data whenever "requested" changes
  const data = useFetch(requested);

  return (
    <div className="container py-4">

      {/* SECTION: Display users */}
      <div className="mb-4">
        <h2 className="mb-3">Users</h2>
        {/* Users component handles its own fetch */}
        <Users />
      </div>

      <hr />

      {/* SECTION: Buttons for selecting data source */}
      <div className="d-flex gap-3 mb-3">

        {/* Clicking these buttons changes the 'requested' URL */}
        <Button 
          variant={requested === postsUrl ? "primary" : "outline-primary"}
          onClick={() => setRequested(postsUrl)}
        >
          Posts
        </Button>

        <Button 
          variant={requested === todosUrl ? "primary" : "outline-primary"}
          onClick={() => setRequested(todosUrl)}
        >
          Todos
        </Button>
      </div>

      {/* Display the currently selected API endpoint */}
      <p className="text-muted">
        <strong>Requested:</strong> {requested}
      </p>

      {/* SECTION: Display fetched data */}
      <div className="row">

        {/* Map through data returned from useFetch */}
        {data.map(el => (
          <div className="col-md-4 mb-3" key={el.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">

                {/* Main title of post or todo */}
                <h5 className="card-title">{el.title}</h5>

                {/* If endpoint is /todos, show "completed" status */}
                {el.completed !== undefined && (
                  <p className="text-muted">
                    Completed: {el.completed ? "Yes" : "No"}
                  </p>
                )}

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default App;
