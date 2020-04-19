// BUG: User is logged out when they submit an already existing course.

import React, { Component } from 'react';
import authenticationService from './services/AuthenticationService';
import { handleResponse } from './helpers/HandleResponse.js';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function submitCourse(name, description) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ name, description })
    };
    return fetch('http://localhost:80/api/courses/add', requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

class NewCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authenticationService.currentUserValue
        }
    }
    
    render() {
	return (
            <div>
	      <h2>Add course</h2>
              <Formik
                initialValues={{
                    name: '',
                    description: ''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Please enter a course name like MATH124'),
                    description: Yup.string().required('Please enter a short description')
                })}
                onSubmit={({ name, description }, { setStatus, setSubmitting }) => {
                    setStatus();
                    submitCourse(name, description)
                        .then(
                            data => {
                                const { from } = this.props.location.state || { from: { pathname: "/" } };
                                this.props.history.push(from);
                            },
                            error => {
                                setSubmitting(false);
                                setStatus(error);
                            }
                        );
                }}
                render={({ errors, status, touched, isSubmitting }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="name">Course Name</label>
                        <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description">Course Description</label>
                        <Field name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Add Course</button>
                        {isSubmitting &&
                         <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                      </div>
                      {status &&
                       <div className={'alert alert-danger'}>{status}</div>
                      }
                    </Form>
                )}
              />
            </div>
	);
    }
}

export default NewCourse;
