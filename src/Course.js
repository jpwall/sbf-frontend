import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import axios from 'axios';
import authenticationService from './services/AuthenticationService';
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
	    rowData: [/*{
		phone_number: "+1 (206) 979 3532", min_grade: 3.5
	    }, {
		phone_number: "+1 (206) 923 1037", min_grade: 3.0
	    }, {
		phone_number: "+1 (206) 979 3438", min_grade: 2.5
	    }*/]
	};
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        };
        axios.get(`http://localhost:80/api/preferences/?cid=${encodeURIComponent(this.props.match.params.cid)}`)
            .then(res => {
                console.log("USERS: ", res);
                this.setState({
                    isLoaded: true,
                    rowData: res.data.users
                });
            },
                  err => {
                      this.setState({
                          isLoaded: true,
                          err
                      });
                  });
    }
    
    render() {
        const { err, isLoaded, currentUser, modules, columnDefs, rowData } = this.state;
        if (err) {
            return <div>Error: {err.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading data...</div>;
        } else {
	    return (
                <div><a href={'/addPhone/' + this.props.match.params.cid} >Add myself as a study buddy!</a>
	          <div className="ag-theme-material" style={ {height: '100vh', width: '100vw'} }>
	            <AgGridReact
                      columnDefs={columnDefs}
                      rowData={rowData}
	            ></AgGridReact>
	          </div>
                </div>
	    );
        }
    }
}

export default Course;
