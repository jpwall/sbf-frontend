// From: https://github.com/cornflourblue/react-jwt-authentication-example/

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Verify from './../pages/Verify.js';

import { authenticationService } from './../authHelpers/AuthenticationService';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        } else if (!currentUser.user.verified) {
            return <Verify {...props} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)

export default PrivateRoute;
