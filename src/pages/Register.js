import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import authenticationService from './../authHelpers/AuthenticationService';
import PhoneInputField from './../components/PhoneInputField';

const ref = React.createRef();

function pTest(phone) {
    if (isPossiblePhoneNumber(phone)) {
        return true;
    }
    return false;
}

class Register extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
        }
    }
    
    render() {
        return (
            <div className="fullPageContainer">
              <div className="logo">STUDIUS</div>
              <Formik
                initialValues={{
                    name: '',
		    email: '',
                    phone: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('Full Name is required'),
		    email: Yup.string()
			.email('Please enter a valid email')
			.required('Email is required'),
                    phone: Yup.string()
                        .test('Phone test',
                              'Invalid Phone Number',
                              value => pTest(value))
                        .required('Phone is required'),
                    password: Yup.string()
			.min(8, 'Password must be at least 8 characters')
			.required('Password is required'),
		    confirmPass: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords must match')
			.required('Confirm password is required')
                })}
                onSubmit={({ name, email, phone, password }, { setStatus, setSubmitting }) => {
                    setStatus();
                    authenticationService.register(name, email, phone, password)
                        .then(
                            user => {
                                const { from } = this.props.location.state || { from: { pathname: "/" } };
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
                        <label htmlFor="name">Full Name </label>
                        <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
		      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email </label>
                        <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone (For SMS Messages)</label>
                        <PhoneInputField ref={ref} name="phone" type="text" onChange={e => {
                            setFieldValue("phone", e);
                            touched.phone = true;
                            errors.phone = isPossiblePhoneNumber(e);
                        }
                                                                                     } className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                        <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password </label>
                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                      </div>
		      <div className="form-group">
			<label htmlFor="confirmPass">Confirm Password </label>
			<Field name="confirmPass" type="password" className={'form-control' + (errors.confirmPass && touched.confirmPass ? ' is-invalid' : '')} />
			<ErrorMessage name="confirmPass" component="div" className="invalid-feedback" />
		      </div>
                      <div className="form-group" id="form-end">
                        <button type="submit" className="btn btn-primary" id="purple" disabled={isSubmitting}>Create Account</button>
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
        )
    }
}

export default Register;
