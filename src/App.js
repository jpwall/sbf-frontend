import React, {Component} from 'react';
import axios from 'axios';
import SearchFiltering from './SearchFiltering';
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
	axios.get(apiUrl + "/api/courses").then(
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
		    <SearchFiltering content={courses} />
	    );
	}
    }
}

export default App;
