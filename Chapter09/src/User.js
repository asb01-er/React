import React, { Component } from 'react';
import firebase from "firebase";
import "firebase/database";
import { Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showDeleteDialog: false,
            selectedUser: {}
        };

        this.add = this.add.bind(this);
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
        this.delete = this.delete.bind(this);
    }

    add() {
        this.props.history.push("/add");
    }

    componentDidMount() {
        firebase.database().ref('/')
            .on('value', snapshot => {
                let returnArr = [];
                snapshot.forEach(data => {
                    let user = data.val();
                    user.key = data.key;
                    returnArr.push(user);
                });
                this.setState({ users: returnArr });
            });
    }

    openDeleteDialog(user) {
        this.setState({
            showDeleteDialog: true,
            selectedUser: user
        });
    }

    closeDeleteDialog() {
        this.setState({
            showDeleteDialog: false,
            selectedUser: {}
        });
    }

    delete() {
        const key = this.state.selectedUser.key;

        firebase
            .database()
            .ref('/' + key)
            .remove()
            .then(() => {
                this.closeDeleteDialog();
            });
    }

    render() {
        const listUsers = this.state.users.map(user => (
            <tr key={user.key}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <Link to={`/edit/${user.key}`}>Edit</Link>
                </td>
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
                <Button variant="primary" onClick={this.add}>Add</Button>

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

                <Modal show={this.state.showDeleteDialog} onHide={this.closeDeleteDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>
                            Are you sure you want to delete<strong> {this.state.selectedUser.username}</strong>?
                        </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.delete}>Delete</Button>
                        <Button variant="secondary" onClick={this.closeDeleteDialog}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default User;
