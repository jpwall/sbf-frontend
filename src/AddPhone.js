import React, { Component } from 'react';
import authenticationService from './services/AuthenticationService';
import { handleResponse } from './helpers/HandleResponse';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class AddPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authenticationService.currentUserValue
        };
    }

    render() {
        return (
            <h2>Add phone number to course with cid {this.props.match.params.cid}!</h2>
        );
    }
}

export default AddPhone;
