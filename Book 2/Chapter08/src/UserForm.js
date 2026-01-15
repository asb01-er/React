import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


class UserForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Any place in React app!</h1>
                <Formik
                    // Set initial values inside the form
                    initialValues={{ email: '', password: '' }}
                    // Validation logic — return an errors object
                    validate={values => {
                        let errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (values.email.length < 10) {
                            errors.email = 'Email address too short';
                        } if (!values.password) {
                            errors.password = 'Required';
                        }
                        else if (values.password.length < 8) {
                            errors.password = 'Password too short';
                        }
                        return errors;
                    }}
                    // What happens when user submits the form
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="email" name="email" />
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                <ErrorMessage name="email" component="div" />
                            </span>
                            <Field type="password" name="password" />
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                <ErrorMessage name="password" component="div" />
                            </span>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div >
        )
    }
}
export default UserForm;