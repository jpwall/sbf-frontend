import React, { Component } from 'react';

class Course extends Component {
    render(){
	const { params } = this.props.match;
	return (
	    <div>
		<h2>Test</h2>
		<p>{params.name}</p>
	    </div>
	);
    }
}

export default Course;
