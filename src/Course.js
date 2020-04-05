import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import authenticationService from './services/AuthenticationService';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

class Course extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    currentUser: authenticationService.currentUserValue,
	    modules: AllCommunityModules,
	    columnDefs: [{
		headerName: "Phone", field: "phone"
	    }, {
		headerName: "Grade", field: "grade", filter: 'agNumberColumnFilter'
	    }, {
		headerName: "User", field: "user"
	    }],
	    rowData: [{
		phone: "+1 (206) 979 3532", grade: 3.5, user: "jpwall"
	    }, {
		phone: "+1 (206) 923 1037", grade: 3.0, user: "JPW"
	    }, {
		phone: "+1 (206) 979 3438", grade: 2.5, user: "jDoe"
	    }]
	}
    }
    
    render(){
	const { params } = this.props.match;
	const { currentUser } = this.state;
	return (
	    <div className="ag-theme-material" style={ {height: '100vh', width: '100vw'} }>
		<AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
		></AgGridReact>
		</div>
	);
    }
}

export default Course;
