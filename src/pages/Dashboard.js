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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                    this.state.courses.map((course) =>
                                           <tr key={course.cid.toString()}>
                                             <td><a href={'/course/' + course.cid}>{course.subject_name}</a></td>
                                             <td>{course.min_grade}</td>
                                             <td><button id="red" onClick={() => { this.removeCourse(course.cid) } }>Delete</button></td>
                                           </tr>
                                          )
                }
              </tbody>
            </table>
        );
        var firstName = this.state.currentUser.user.name.split(" ")[0];
        return (
            <React.Fragment>
              <Header title={firstName} currentUser={this.state.currentUser} />
              <div className="primaryContainer">
                <div className="internalContainer">
                  <h1>Hi, {firstName}!</h1>
                  <h2>You are listed as a study buddy in:</h2>
                  {userCourses}
                </div>
              </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
