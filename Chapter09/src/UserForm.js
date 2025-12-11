import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import firebase from "firebase";
import "firebase/database";

class UserForm extends Component {
    constructor(props) {
        super(props);

        // Route parameter: /edit/:id
        // If id exists → we are in EDIT mode, else ADD mode
        this.id = this.props.match.params.id;

        // Dynamic title for the page
        this.title = this.id ? "Edit User" : "New User";

        // Form fields stored in state so Formik can reinitialize
        this.state = {
            username: '',
            email: '',
        };
    }

    // ============================================================
    // PREFILL FORM DATA WHEN EDITING
    // ============================================================
    componentDidMount() {
        // If editing, fetch existing user from Firebase
        if (this.id) {
            firebase
                .database()
                .ref('/' + this.id)      // reference specific user record
                .on('value', snapshot => {
                    const data = snapshot.val();

                    // Populate form fields with database values
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

                {/* ===============================================
                    FORMIK FORM
                    enableReinitialize → allows form to update when
                    state changes (useful for edit mode prefill)
                =============================================== */}
                <Formik
                    enableReinitialize={true}

                    // Initial values read from component state
                    initialValues={{
                        username: this.state.username,
                        email: this.state.email,
                    }}

                    // ===============================================
                    // SIMPLE VALIDATION RULES
                    // ===============================================
                    validate={values => {
                        let errors = {};

                        if (!values.username) {
                            errors.username = 'Username required';
                        }

                        if (!values.email) {
                            errors.email = 'Email required';
                        } 
                        else if (values.email.length < 5) {
                            errors.email = 'Email too short';
                        }

                        return errors;
                    }}

                    // ===============================================
                    // HANDLE SUBMISSION → FIREBASE CREATE / UPDATE
                    // ===============================================
                    onSubmit={(values, { setSubmitting }) => {
                        const userRef = firebase.database().ref('/');

                        // UPDATE (Edit mode)
                        if (this.id) {
                            firebase
                                .database()
                                .ref('/' + this.id)
                                .update({
                                    username: values.username,
                                    email: values.email,
                                })
                                .then(() => this.props.history.push("/"));
                        }

                        // CREATE (Add mode)
                        else {
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

                    {/* Formik render props */}
                    {({ isSubmitting }) => (
                        <Form>

                            {/* ===============================================
                                USERNAME FIELD
                            =============================================== */}
                            <label>Username</label>
                            <Field type="text" name="username" />
                            <div style={{ color: "red", fontWeight: "bold" }}>
                                <ErrorMessage name="username" />
                            </div>

                            {/* ===============================================
                                EMAIL FIELD
                            =============================================== */}
                            <label>Email</label>
                            <Field type="email" name="email" />
                            <div style={{ color: "red", fontWeight: "bold" }}>
                                <ErrorMessage name="email" />
                            </div>

                            {/* Submit button (disabled while submitting) */}
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
