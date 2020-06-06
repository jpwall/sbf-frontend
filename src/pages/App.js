import React, {Component} from 'react';
import SearchFiltering from './../components/SearchFiltering';
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
    
    CoursePageRedirect(event) {
	window.location.assign('/course');
    }

    render() {
	const { error, isLoaded, courses } = this.state;
	if (error) {
	    return <div>Error: {error.message}</div>;
	} else {
	    return (
                <SearchFiltering />
	    );
	}
    }
}

export default App;
