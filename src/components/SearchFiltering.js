import React, { Component } from 'react';
import { handleResponse } from './../authHelpers/HandleResponse';

class SearchFiltering extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        error: null,
        isLoaded: false,
        timeout: 0,
        courses: []
    }

    updateSearch(val) {
        if (this.state.timeout) clearTimeout(this.state.timeout);
        this.setState({
            isLoaded: false,
            courses: []
        });
        if (val.length >=3) {
            this.state.timeout = setTimeout(() => {
                this.searchCourses(val.toUpperCase());
            }, 1000);
        }
    }

    searchCourses(search) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ search })
        };
        
        fetch(process.env.REACT_APP_API_URL + '/api/courses/search', requestOptions)
            .then(handleResponse)
            .then(data => {
                this.setState({
                    isLoaded: true,
                    courses: data
                });
            });
    }

    render() {
        const { error, isLoaded, courses } = this.state;
        return (
            <React.Fragment>
              <form>
                <input className="caps" type="text" placeholder="Start typing to search courses..." onChange={e => this.updateSearch(e.target.value)} />
              </form>
              <div>
                {
                    courses.map((course) => 
                                <a href={'/course/' + course.cid} key={course.cid}><div key={course.cid}>{course.subject_name}</div></a>
                               )
                }
              </div>
            </React.Fragment>
        );
    }
}

export default SearchFiltering;
