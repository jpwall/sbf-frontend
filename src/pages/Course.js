// BUG: Need to figure out how to show actionButton as the same type (either a tag or button)
import React, { Component } from 'react';
import CourseTable from './../components/CourseTable';
import Header from './../components/Header';
import Footer from './../components/Footer';
import axios from 'axios';
import authenticationService from './../authHelpers/AuthenticationService';
import { handleResponse } from './../authHelpers/HandleResponse';

class Course extends Component {
    constructor(props) {
	super(props);
	this.state = {
            err: null,
            isLoaded: false,
	    currentUser: authenticationService.currentUserValue,
	    rowData: [],
            courseName: null,
            description: null,
            isUser: null
	};
    }

    getRowData() {
        const token = this.state.currentUser.token;
        axios.get(process.env.REACT_APP_API_URL + `/api/preferences/?cid=${encodeURIComponent(this.props.match.params.cid)}`, { headers: { Authorization: token } })
            .then(res => {
                this.setState({
                    isLoaded: true,
                    rowData: res.data
                });
            }, err => {
                this.setState({
                    isLoaded: true,
                    err
                });
            });
    }
    
    componentDidMount() {
        const uid = this.state.currentUser.user.uid;
        const cid = this.props.match.params.cid;
        const token = this.state.currentUser.token;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ uid, cid })
        };

        this.getRowData();
        axios.get(process.env.REACT_APP_API_URL + `/api/courses/get/?cid=${encodeURIComponent(this.props.match.params.cid)}`, { headers: { Authorization: token } })
            .then(res => {
                this.setState({
                    courseName: res.data.subject_name,
                    description: res.data.description
                });
            }, err => {
                this.setState({
                    isLoaded: true,
                    err
                });
            });
        fetch(process.env.REACT_APP_API_URL + '/api/preferences/check', requestOptions)
            .then(handleResponse)
            .then(data => {
                var ret = false;
                if (parseInt(data.msg.case) == 1) {
                    ret = true;
                }
                this.setState({
                    isUser: ret
                });
            });
    }

    removeUser(uid, cid) {
        const token = this.state.currentUser.token;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ uid, cid })
        };
        return fetch(process.env.REACT_APP_API_URL + '/api/preferences/remove', requestOptions)
            .then(data => {
                this.setState({
                    isUser: false
                });
                this.getRowData();
            });
    }
    
    render() {
        if (this.state.err) {
            return <div>Error: {this.state.err.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading data...</div>;
        } else {
            const isUser = this.state.isUser;
            let actionButton;
            if (isUser) {
                actionButton = <button id="red" onClick={() => { this.removeUser(this.state.currentUser.user.uid, this.props.match.params.cid) } }>Remove myself from {this.state.courseName}</button>;
            } else {
                actionButton = <a className="button-alt" href={'/addPhone/' + this.props.match.params.cid} >Add myself to {this.state.courseName}</a>;
            }
	    return (
                <React.Fragment>
                  <Header currentUser={this.state.currentUser} />
                  <div className="primaryContainer">
                    <div className="internalContainer">
                      <h1>{this.state.courseName}</h1>
                      <h2>{this.state.description}</h2>
                      {actionButton}
                      <CourseTable rowData={this.state.rowData} />
                    </div>
                  </div>
                  <Footer />
                </React.Fragment>
	    );
        }
    }
}

export default Course;
