import './App.css';
import React, { useReducer } from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';

// Initial global state for todos
const todosInitialState = {
  todos: [
    { id: 1, text: "finishing writing hooks chapter" },
    { id: 2, text: "play with kids" },
    { id: 3, text: "read bible" }
  ]
};

// Reducer function that controls how state changes
function todosReducer(state, action) {

  // Decide what to do based on action type
  switch (action.type) {

    case 'add':
      // Create a new todo object
      const newToDo = {
        id: uuidv4(),
        text: action.payload
      };

      // Add new todo to existing todos array
      const addedToDos = [...state.todos, newToDo];

      // Return updated state
      return { ...state, todos: addedToDos };

    case 'delete':
      // Remove the todo whose id matches the payload id
      const filteredTodoState = state.todos.filter(
        todo => todo.id !== action.payload.id
      );

      // Return updated state after deletion
      return { ...state, todos: filteredTodoState };

    case 'edit':
      // Updated todo coming from the component
      const updatedToDo = { ...action.payload };

      // Find index of the todo being edited
      const updatedToDoIndex = state.todos.findIndex(
        t => t.id === action.payload.id
      );

      // Replace old todo with updated todo
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1)
      ];

      // Return updated state
      return { ...state, todos: updatedToDos };

    default:
      // Return initial state if action type is unknown
      return todosInitialState;
  }
}

// Create context to share todos state globally
export const TodosContext = React.createContext();

function App() {

  // useReducer manages todos state and updates via dispatch
  const [state, dispatch] = useReducer(
    todosReducer,
    todosInitialState
  );

  return (
    // Provide state and dispatch to all child components
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDoList />
    </TodosContext.Provider>
  );
}


export default App;



