import React, { Component } from 'react';
import authenticationService from './../authHelpers/AuthenticationService';
import './../Global.css';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        openMenu: false
    }

    render() {
        var isLoggedIn = false;
        if (this.props.currentUser != null) {
            isLoggedIn = true;
        }
        let rightSide;
        if (isLoggedIn) {
            rightSide = (<div className="rightSideHeader">
                           <a href="/dashboard"><div className="button">My Courses</div></a>
                           <a href="/" onClick={() => { authenticationService.logout() }} className="button" id="black">Logout</a>
                         </div>);
        } else {
            rightSide = (<div className="rightSideHeader">
                           <a href="/login"><div className="button">Login</div></a>
                           <a href="/register"><div className="button" id="purple">Register</div></a>
                         </div>);
        }
        return (
            <div className="header">
              <a href="/"><img src={process.env.PUBLIC_URL + '/logo_normal.png'} height="60px"/></a>
              {rightSide}
            </div>
        );
    }
}

export default Header;
