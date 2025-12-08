import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import firebase from "firebase";
import "firebase/database";

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.id = this.props.match.params.id;
        this.title = this.id ? "Edit User" : "New User";

        this.state = {
            username: '',
            email: '',
        };
    }

    componentDidMount() {
        if (this.id) {
            firebase
                .database()
                .ref('/' + this.id)
                .on('value', snapshot => {
                    const data = snapshot.val();
                    if (data) {
                        this.setState({
                            username: data.username,
                            email: data.email,
                        });
                    }
                });
        }
    }

    render() {
        return (
            <div>
                <h1>{this.title}</h1>

                <Formik
                    enableReinitialize={true}

                    initialValues={{
                        username: this.state.username,
                        email: this.state.email,
                    }}

                    validate={values => {
                        let errors = {};
                        if (!values.username) {
                            errors.username = 'Username required';
                        }
                        if (!values.email) {
                            errors.email = 'Email required';
                        } else if (values.email.length < 5) {
                            errors.email = 'Email too short';
                        }
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {
                        const userRef = firebase.database().ref('/');

                        if (this.id) {
                            firebase
                                .database()
                                .ref('/' + this.id)
                                .update({
                                    username: values.username,
                                    email: values.email,
                                })
                                .then(() => this.props.history.push("/"));
                        } else {
                            userRef
                                .push({
                                    username: values.username,
                                    email: values.email,
                                })
                                .then(() => this.props.history.push("/"));
                        }

                        setSubmitting(false);
                    }}
                >

                    {({ isSubmitting }) => (
                        <Form>

                            <label>Username</label>
                            <Field type="text" name="username" />
                            <div style={{ color: "red", fontWeight: "bold" }}>
                                <ErrorMessage name="username" />
                            </div>

                            <label>Email</label>
                            <Field type="email" name="email" />
                            <div style={{ color: "red", fontWeight: "bold" }}>
                                <ErrorMessage name="email" />
                            </div>

                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>

                        </Form>
                    )}

                </Formik>
            </div>
        );
    }
}

export default UserForm;
