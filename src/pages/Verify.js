import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import authenticationService from './../authHelpers/AuthenticationService';
import { handleResponse } from './../authHelpers/HandleResponse';

class Verify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err: null,
            currentUser: authenticationService.currentUserValue
        }
    }

    componentDidMount() {
        const phone = this.state.currentUser.user.phone;
        const token = this.state.currentUser.token;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ phone })
        };
        fetch(process.env.REACT_APP_API_URL + '/api/users/verifySend', requestOptions)
            .then(handleResponse);
    }

    verifyCheck(code) {
        const phone = this.state.currentUser.user.phone;
        const token = this.state.currentUser.token;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ phone, code })
        };
        return fetch(process.env.REACT_APP_API_URL + '/api/users/verifyCheck', requestOptions)
            .then(handleResponse)
            .then(data => {
                return data;
            });
    }

    render() {
        return (
            <div className="fullPageContainer">
              <img src={process.env.PUBLIC_URL + '/logo_normal.png'} height="80px"/>
              <h2>Last step, we promise - please verify your phone number</h2>
              <Formik
                initialValues={{
                    code: ''
                }}
                validationSchema={Yup.object().shape({
                    code: Yup.number()
                        .required('Verification code is required.')
                })}
                onSubmit={({ code }, { setStatus, setSubmitting }) => {
                    setStatus();
                    this.verifyCheck(code)
                        .then(
                            data => {
                                const { from } = this.props.location.state || { from: { pathname: "/" } };
                                localStorage.setItem('currentUser', JSON.stringify(data));
                                this.props.history.push(from);
                            },
                            error => {
                                setSubmitting(false);
                                setStatus(error);
                            }
                        );
                }}
                render={({ errors, status, touched, isSubmitting, setFieldValue }) => (
                    <Form>
		      <div className="form-group">
		        <label htmlFor="code">Please enter the code sent to +{this.state.currentUser.user.phone} </label>
			<Field name="code" type="text" className={'form-control' + (errors.code && touched.code ? ' is-invalid' : '')} />
			<ErrorMessage name="code" component="div" className="invalid-feedback" />
		      </div>
                      <div className="form-group" id="form-end">
                        <button type="submit" className="btn btn-primary" id="purple" disabled={isSubmitting}>Submit</button>
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

export default Verify;
