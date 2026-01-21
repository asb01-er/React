import './App.css';
import React, { useReducer } from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';

// Initial global state for todos
const todosInitialState = {
  todos: []
};

// Reducer controls how todos state changes
function todosReducer(state, action) {
  switch (action.type) {

    case 'get':
      // Load todos fetched from the API into global state
      return { ...state, todos: action.payload };

    case 'add':
      // Add new todo to existing todos array
      const addedToDos = [...state.todos, action.payload];

      // Return updated state
      return { ...state, todos: addedToDos };

    case 'delete':
      // Remove todo whose id matches payload id
      const filteredTodoState = state.todos.filter(
        todo => todo.id !== action.payload.id
      );

      // Return updated state after deletion
      return { ...state, todos: filteredTodoState };

    case 'edit':
      // Updated todo object
      const updatedToDo = { ...action.payload };

      // Find index of todo being edited
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

// Create context to share todos state and dispatch globally
export const TodosContext = React.createContext();

function App() {

  // useReducer manages global todos state
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
