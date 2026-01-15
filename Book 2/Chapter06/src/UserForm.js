import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function UserForm() {
    // State to store email input
    const [email, setEmail] = useState("");
    // State to store password input
    const [password, setPassword] = useState("");
    // State to store email validation error message
    const [emailError, setEmailError] = useState("");
    // State to store password validation error message
    const [passwordError, setPasswordError] = useState("");

    // Function to handle form submission
    const handleSubmit = event => {
        event.preventDefault(); // Prevent page reload on submit

        let emailValid = false; // Flag for email validation

        // Email validation checks
        if (email.length === 0) {
            setEmailError("Email is required");
        } else if (email.length < 6) {
            setEmailError("Email should be minimum 6 characters");
        } else if (email.indexOf(' ') >= 0) {
            setEmailError('Email cannot contain spaces');
        } else {
            setEmailError(""); // Clear error if valid
            emailValid = true;
        }

        let passwordValid = false; // Flag for password validation

        // Password validation checks
        if (password.length === 0) {
            setPasswordError("Password is required");
        } else if (password.length < 6) {
            setPasswordError("Password should be minimum 6 characters");
        } else if (password.indexOf(' ') >= 0) {
            setPasswordError('Password cannot contain spaces');
        } else {
            setPasswordError(""); // Clear error if valid
            passwordValid = true;
        }

        // If both email and password are valid
        if (emailValid && passwordValid) {
            alert('Email: ' + email + '\nPassword: ' + password); // Show alert with values
            setEmail(""); // Clear email field
            setPassword(""); // Clear password field
        }
    }

    return (
        <div>
            {/* Form using react-bootstrap */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        onChange={event => setEmail(event.target.value)} // Update email state on input
                        value={email} 
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                {/* Display email error if any */}
                {emailError.length > 0 && <Alert variant="danger">{emailError}</Alert>}

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)} // Update password state on input
                        value={password} 
                    />
                </Form.Group>

                {/* Display password error if any */}
                {passwordError.length > 0 && <Alert variant="danger">{passwordError}</Alert>}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            {/* Display current input values below the form */}
            Email entered: {email}
            <br />
            Password entered: {password}
        </div>
    );
}

export default UserForm;
