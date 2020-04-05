// From: https://github.com/cornflourblue/react-jwt-authentication-example/

import axios from "axios";
import { BehaviorSubject } from 'rxjs';

//import config from 'config';
import { handleResponse } from './../helpers/HandleResponse';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    register,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`http://localhost:80/api/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function register(name, email, password) {
    /*const requestOptions = {
	method: 'POST',
	mode: 'no-cors',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ name, email, password })
    };
    return fetch('http://localhost:80/api/users/register', requestOptions);*/
    axios.post('http://localhost:80/api/users/register', {name: name, email: email, password: password})
	.then(handleResponse)
	.then(user => {
	    return user;
	});
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

export default authenticationService;
