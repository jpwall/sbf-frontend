import React, {Component} from 'react';
import authenticationService from './../authHelpers/AuthenticationService';
import SearchFiltering from './../components/SearchFiltering';
import Header from './../components/Header';
import BLM from './../components/BLM';
import Footer from './../components/Footer';
import './../Global.css';

const apiUrl = 'http://localhost:80';

class App extends Component {
    constructor (props) {
	super(props);
	this.state = {
	    error: null,
	    isLoaded: false,
            currentUser: authenticationService.currentUserValue,
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
                <React.Fragment>
                  <BLM />
                  <Header currentUser={this.state.currentUser} />
                  <div style={{ marginTop:'-80px', paddingTop:'80px;' }} className="primaryContainer">
                    <div className="searchFiltering">
                      <h1>Find a study buddy in your class!</h1>
                      <SearchFiltering />
                    </div>
                  </div>
                  <Footer />
                </React.Fragment>
	    );
	}
    }
}

export default App;
