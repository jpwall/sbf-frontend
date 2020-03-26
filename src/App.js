import React, {Component} from 'react';
import logo from './logo.svg';
import { Search } from "react-find";
import ReactDOM from "react-dom";
import axios from "axios";
import './App.css';

class App extends Component {
    state = {
	error: null,
	isLoaded: false,
	courses: []
    };

    componentDidMount() {
	axios.get("/courses").then(
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
    
    CoursePageRedirect() {
	window.location.assign('/course');
    }

    render() {
	//const courses = [];
	const { error, isLoaded, courses } = this.state;
	if (error) {
	    return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
	    return <div>Loading...</div>;
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
