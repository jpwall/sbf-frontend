import React, { Component } from 'react';
import Header from './../components/Header';
import authenticationService from './../authHelpers/AuthenticationService';
import { handleResponse } from './../authHelpers/HandleResponse';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            err: null,
            isLoaded: false,
            currentUser: authenticationService.currentUserValue,
            courses: [],
        };
        this.deleteRow = this.deleteRow.bind(this);
    }

    deleteRow(r) {
        let rows = [...this.state.courses];
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].cid == r) {
                rows.splice(i, 1);
            }
        }
        this.setState({
            courses: rows
        });
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
                this.setState({
                    courses: data.msg
                });
            });
    }

    removeCourse(cid) {
        const uid = this.state.currentUser.user.uid;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ uid, cid })
        };
        return fetch('http://localhost:80/api/preferences/remove', requestOptions)
            .then(handleResponse)
            .then(data => {
                this.deleteRow(data.msg);
            });
    }

    componentDidMount() {
        this.getActiveCourses();
    }

    render() {
        var userCourses = (
            <table>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Min Grade</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {
                    this.state.courses.map((course) =>
                                           <tr key={course.cid.toString()}>
                                             <td>{course.subject_name}</td>
                                             <td>{course.min_grade}</td>
                                             <td><button onClick={() => { this.removeCourse(course.cid) } }>Remove</button></td>
                                           </tr>
                                          )
                }
              </tbody>
            </table>
        );
        return (
            <React.Fragment>
              <Header currentUser={this.state.currentUser} />
              {userCourses}
            </React.Fragment>
        );
    }
}

export default Dashboard;
