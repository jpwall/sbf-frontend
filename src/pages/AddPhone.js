import React, { Component } from 'react';
import authenticationService from './../authHelpers/AuthenticationService';
import { handleResponse } from './../authHelpers/HandleResponse';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// CID: this.state.currentUser.user.uid
// Token: this.state.currentUser.token
function submitPhone(uid, cid, minGrade) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ uid, cid, minGrade })
    };
    return fetch('http://localhost:80/api/preferences/add', requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

class AddPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authenticationService.currentUserValue
        };
    }

    render() {
        return (
            <div>
              <h2>Add me to the class!</h2>
              <Formik
                initialValues={{
                    grade: ''
                }}
                validationSchema={Yup.object().shape({
                    grade: Yup.number().min(0.0, 'Please enter a grade above 0.0').max(4.0, 'Please enter a grade at or below a 4.0').required('Please enter a grade between 0.0 and 4.0')
                })}
                onSubmit={({ grade }, { setStatus, setSubmitting }) => {
                    setStatus();
                    submitPhone(this.state.currentUser.user.uid, this.props.match.params.cid, grade)
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
                        <label htmlFor="grade">My desired minimum grade in this class</label>
                        <Field name="grade" type="text" className={'form-control' + (errors.grade && touched.grade ? ' is-invalid' : '')} />
                        <ErrorMessage name="grade" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>List me as a Study Buddy!</button>
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

export default AddPhone;
