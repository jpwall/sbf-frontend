import React, {Component} from 'react';
import logo from './logo.svg';
import { Search } from "react-find";
import ReactDOM from "react-dom";
import render from "react-dom";
import axios from "axios";
import {Router, Route} from 'react-router';
import './App.css';

const apiUrl = 'http://localhost:80';

class App extends Component {
    constructor (props) {
	super(props);
	this.state = {
	    error: null,
	    isLoaded: false,
	    courses: []
	};

	this.CoursePageRedirect = this.CoursePageRedirect.bind(this);
    }
    
    componentDidMount() {
	axios.get(apiUrl + '/courses').then(
	    result => {
		this.setState({
		    isLoaded: true,
		    courses: result.data
		});
	    },
	    error => {
		this.setState({
		    isLoaded: true,
		    error
		});
	    }
	);
    }
    
    CoursePageRedirect(event) {
	window.location.assign('/course');
    }

    render() {
	const { error, isLoaded, courses } = this.state;
	if (error) {
	    return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
	    return <div>Loading courses...</div>;
	} else {
	    return (
		    <div className="App">
		    <Search
		      placeholder="Search for your course..."
		      data={courses}
		      currentLocation={false} 
		      latestSearch={false}
		      onClick={this.CoursePageRedirect}
		    />
		    </div>
	    );
	}
    }
}

export default App;
