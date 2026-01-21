import React, { useContext, useState, useEffect } from 'react';
import { TodosContext } from './App';
import { Table, Form, Button } from 'react-bootstrap';
import axios from "axios";
import useAPI from './useAPI';
import { v4 as uuidv4 } from 'uuid';

function ToDoList() {

    // Access global todos state and dispatch function from context
    const { state, dispatch } = useContext(TodosContext);

    // Local state for input field text
    const [todoText, setTodoText] = useState("");

    // Determines whether we are editing an existing todo
    const [editMode, setEditMode] = useState(false);

    // Stores the todo item currently being edited
    const [editTodo, setEditTodo] = useState(null);

    // Button text changes based on add or edit mode
    const buttonTitle = editMode ? "Edit" : "Add";

    // API endpoint for todos
    const endpoint = "http://localhost:3000/todos/";

    // Custom hook that fetches todos from the API
    const savedTodos = useAPI(endpoint);

    // Whenever savedTodos changes, update global state
    useEffect(() => {
        dispatch({ type: "get", payload: savedTodos });
    }, [savedTodos]); // Runs when API data changes

    // Handles adding and editing todos
    const handleSubmit = async event => {
        event.preventDefault(); // Prevent page reload

        if (editMode) {
            // Update todo on the server
            await axios.patch(endpoint + editTodo.id, {
                text: todoText
            });

            // Update todo in global state
            dispatch({
                type: 'edit',
                payload: { ...editTodo, text: todoText }
            });

            // Reset edit state
            setEditMode(false);
            setEditTodo(null);
        } else {
            // Create a new todo object
            const newToDo = {
                id: uuidv4(),
                text: todoText
            };

            // Save new todo to the server
            await axios.post(endpoint, newToDo);

            // Update global state
            dispatch({
                type: 'add',
                payload: newToDo
            });
        }

        // Clear input field after submit
        setTodoText("");
    };

    return (
        <div>

            {/* Form for adding or editing todos */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="Enter To Do"
                        onChange={event => setTodoText(event.target.value)}
                    />
                </Form.Group>

                {/* Button text switches between Add and Edit */}
                <Button variant="primary" type="submit">
                    {buttonTitle}
                </Button>
            </Form>

            {/* Table displaying todos */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>To Do</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Render todos from global state */}
                    {state.todos.map(todo => (
                        <tr key={todo.id}>
                            {/* Todo text */}
                            <td>{todo.text}</td>

                            {/* Edit action */}
                            <td
                                onClick={() => {
                                    // Load todo into form for editing
                                    setTodoText(todo.text);
                                    setEditMode(true);
                                    setEditTodo(todo);
                                }}
                            >
                                <Button variant="link">Edit</Button>
                            </td>

                            {/* Delete action */}
                            <td
                                onClick={async () => {
                                    // Remove todo from server
                                    await axios.delete(endpoint + todo.id);

                                    // Remove todo from global state
                                    dispatch({
                                        type: 'delete',
                                        payload: todo
                                    });
                                }}
                            >
                                <Button variant="link">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ToDoList;