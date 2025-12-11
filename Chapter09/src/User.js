import React, { Component } from 'react';
import firebase from "firebase";
import "firebase/database";
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class User extends Component {
    constructor(props) {
        super(props);

        // Component state holds:
        // - users: list of users fetched from Firebase
        // - showDeleteDialog: controls delete confirmation modal
        // - selectedUser: the user currently chosen for deletion
        this.state = {
            users: [],
            showDeleteDialog: false,
            selectedUser: {}
        };

        // Bind methods for button handlers
        this.add = this.add.bind(this);
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
        this.delete = this.delete.bind(this);
    }

    // Navigate to the Add User form
    add() {
        this.props.history.push("/add");
    }

    // =============================================
    // READ USERS FROM FIREBASE ON COMPONENT MOUNT
    // =============================================
    componentDidMount() {
        firebase
            .database()
            .ref('/')                 // root of the database (all users)
            .on('value', snapshot => {
                let returnArr = [];

                // Firebase snapshot contains child nodes
                snapshot.forEach(data => {
                    let user = data.val();    // actual user object {username, email}
                    user.key = data.key;      // attach Firebase unique key
                    returnArr.push(user);
                });

                // Update component state with fetched users
                this.setState({ users: returnArr });
            });
    }

    // =============================================
    // OPEN DELETE CONFIRMATION MODAL
    // =============================================
    openDeleteDialog(user) {
        this.setState({
            showDeleteDialog: true,
            selectedUser: user
        });
    }

    // CLOSE DELETE MODAL
    closeDeleteDialog() {
        this.setState({
            showDeleteDialog: false,
            selectedUser: {}
        });
    }

    // =============================================
    // DELETE USER FROM FIREBASE
    // =============================================
    delete() {
        const key = this.state.selectedUser.key;

        firebase
            .database()
            .ref('/' + key)           // path of the user node
            .remove()                 // Firebase delete operation
            .then(() => {
                // Close modal after deletion
                this.closeDeleteDialog();
            });
    }

    render() {

        // =============================================
        // RENDER USERS IN A TABLE
        // =============================================
        const listUsers = this.state.users.map(user => (
            <tr key={user.key}>
                <td>{user.username}</td>
                <td>{user.email}</td>

                {/* Edit button — routes to /edit/:id */}
                <td>
                    <Link to={`/edit/${user.key}`}>Edit</Link>
                </td>

                {/* Delete button — opens confirmation modal */}
                <td>
                    <Button
                        variant="danger"
                        onClick={() => this.openDeleteDialog(user)}
                    >
                        Remove
                    </Button>
                </td>
            </tr>
        ));

        return (
            <div>
                {/* Navigate to Add User page */}
                <Button variant="primary" onClick={this.add}>Add</Button>

                {/* USERS TABLE */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{listUsers}</tbody>
                </Table>

                {/* =============================================
                    DELETE CONFIRMATION MODAL
                ============================================= */}
                <Modal
                    show={this.state.showDeleteDialog}
                    onHide={this.closeDeleteDialog}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>
                            Are you sure you want to delete
                            <strong> {this.state.selectedUser.username}</strong>?
                        </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.delete}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={this.closeDeleteDialog}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default User;
