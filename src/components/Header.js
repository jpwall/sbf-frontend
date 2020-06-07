import React, { Component } from 'react';
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
            rightSide = <div className="rightSideHeader"><a href="/dashboard"><div className="button">Your Profile</div></a><a href="/logout"><div className="button">Logout</div></a></div>;
        } else {
            rightSide = <div className="rightSideHeader"><a href="/login"><div className="button">Login</div></a><a href="/register"><div className="button">Register</div></a></div>;
        }
        return (
            <div className="header">
              <div className="menuButton">MENU</div>
              <a href="/"><div className="logo">STUDIUS</div></a>
              {rightSide}
            </div>
        );
    }
}

export default Header;
