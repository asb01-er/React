import React, { useContext, useState } from 'react';
import { TodosContext } from './App';
import { Table, Form, Button } from 'react-bootstrap';

function ToDoList() {

    // Get global todos state and dispatch function from context
    const { state, dispatch } = useContext(TodosContext);

    // Holds the text entered in the input field
    const [todoText, setTodoText] = useState("");

    // Tracks whether the user is editing or adding a todo
    const [editMode, setEditMode] = useState(false);

    // Stores the todo item currently being edited
    const [editTodo, setEditTodo] = useState(null);

    // Button label changes based on mode
    const buttonTitle = editMode ? "Edit" : "Add";

    // Runs when the form is submitted
    const handleSubmit = event => {
        event.preventDefault(); // Prevent page reload

        if (editMode) {
            // Update an existing todo
            dispatch({
                type: 'edit',
                payload: { ...editTodo, text: todoText }
            });

            // Reset edit state after updating
            setEditMode(false);
            setEditTodo(null);
            setTodoText("");
        } else {
            // Add a new todo
            dispatch({
                type: 'add',
                payload: todoText
            });

            // Clear input after adding
            setTodoText("");
        }
    };

    return (
        <div>
            {/* Form used for adding and editing todos */}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Enter To Do"
                        value={todoText}
                        onChange={event => setTodoText(event.target.value)}
                    />
                </Form.Group>

                {/* Button text switches between Add and Edit */}
                <Button type="submit">
                    {buttonTitle}
                </Button>
            </Form>

            {/* Display todo items in a table */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>To Do</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Loop through todos stored in global state */}
                    {state.todos.map(todo => (
                        <tr key={todo.id}>
                            {/* Todo text */}
                            <td>{todo.text}</td>

                            {/* Edit action */}
                            <td
                                onClick={() => {
                                    // Load selected todo into input
                                    setTodoText(todo.text);
                                    setEditMode(true);
                                    setEditTodo(todo);
                                }}
                            >
                                Edit
                            </td>

                            {/* Delete action */}
                            <td
                                onClick={() =>
                                    dispatch({ type: 'delete', payload: todo })
                                }
                            >
                                Delete
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ToDoList;