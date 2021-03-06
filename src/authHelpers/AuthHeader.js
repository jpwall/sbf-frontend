// From: https://github.com/cornflourblue/react-jwt-authentication-example/

import { authenticationService } from './AuthenticationService';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}
