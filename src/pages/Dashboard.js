// CURRENT BUG: Does not run getActiveCourses on successful remove. Still learning react...

import React, { Component } from 'react';
import authenticationService from './../authHelpers/AuthenticationService';
import { handleResponse } from './../authHelpers/HandleResponse';

function CourseList(props) {
    console.log('COURSES: ', props);
    const courses = props.courses;
    const removeUser = props.removeUser;
    const rows = courses.map((course) =>
                                        <tr key={course.cid.toString()}>
                                          <td>{course.subject_name}</td>
                                          <td>{course.min_grade}</td>
                                          <td><button onClick={() => { removeUser(props.uid, course.cid) } }>Remove</button></td>
                                        </tr>
                                       );
    return (
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Min Grade</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
    );
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            err: null,
            isLoaded: false,
            currentUser: authenticationService.currentUserValue,
            courses: [],
        };
    }

    getActiveCourses() {
        const uid = this.state.currentUser.user.uid;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ uid })
        };
        fetch('http://localhost:80/api/preferences/userCourses', requestOptions)
            .then(handleResponse)
            .then(data => {
                console.log('THA DATA: ', data);
                this.setState({
                    courses: data.msg
                });
            });
    }

    removeUser(uid, cid) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ uid, cid })
        };
        return fetch('http://localhost:80/api/preferences/remove', requestOptions)
            .then(handleResponse)
            .then(data => {
                this.getActiveCourses();
            });
    }

    componentDidMount() {
        this.getActiveCourses();
    }

    render() {
        return (
            <CourseList courses={this.state.courses} removeUser={this.removeUser} uid={this.state.currentUser.user.uid}/>
        );
    }
}

export default Dashboard;
