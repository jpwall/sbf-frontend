import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import axios from 'axios';
import authenticationService from './../authHelpers/AuthenticationService';
import { handleResponse } from './../authHelpers/HandleResponse';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

class Course extends Component {
    constructor(props) {
	super(props);
	this.state = {
            err: null,
            isLoaded: false,
	    currentUser: authenticationService.currentUserValue,
	    modules: AllCommunityModules,
	    columnDefs: [{
                headerName: "Name", field: "full_name"
            },{
		headerName: "Phone", field: "phone_number"
	    }, {
		headerName: "Min. Grade", field: "min_grade", filter: 'agNumberColumnFilter'
	    }],
	    rowData: [],
            courseName: null,
            description: null,
            isUser: null
	};
    }

    getRowData() {
        axios.get(`http://localhost:80/api/preferences/?cid=${encodeURIComponent(this.props.match.params.cid)}`)
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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ uid, cid })
        };

        this.getRowData();
        axios.get(`http://localhost:80/api/courses/get/?cid=${encodeURIComponent(this.props.match.params.cid)}`)
            .then(res => {
                console.log('RES DATA: ', res.data);
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
        fetch('http://localhost:80/api/preferences/check', requestOptions)
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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ uid, cid })
        };
        return fetch('http://localhost:80/api/preferences/remove', requestOptions)
            .then(data => {
                this.setState({
                    isUser: false
                });
                this.getRowData();
            });
    }
    
    render() {
        const { err, isLoaded, currentUser, modules, columnDefs, rowData } = this.state;
        if (err) {
            return <div>Error: {err.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading data...</div>;
        } else {
            const isUser = this.state.isUser;
            let actionButton;
            if (isUser) {
                actionButton = <button onClick={() => { this.removeUser(this.state.currentUser.user.uid, this.props.match.params.cid) } }>Remove myself from {this.state.courseName}</button>;
            } else {
                actionButton = <div><a href={'/addPhone/' + this.props.match.params.cid} >Add myself as a study buddy to {this.state.courseName}</a></div>;
            }
	    return (
                <React.Fragment>
                  <div>{this.state.courseName}</div>
                  <div>{this.state.description}</div>
                  {actionButton}
	          <div className="ag-theme-material" style={ {height: '100vh', width: '100vw'} }>
	            <AgGridReact
                      columnDefs={columnDefs}
                      rowData={rowData}
	            ></AgGridReact>
	          </div>
                </React.Fragment>
	    );
        }
    }
}

export default Course;
