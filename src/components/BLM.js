import React, { Component } from 'react';
import authenticationService from './../authHelpers/AuthenticationService';
import './../Global.css';

class BLM extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="blm">
              <div>BLACK LIVES MATTER. STUDIUS proudly supports defunding and re-envisioning police in the USA as we know it. Learn more <a style={{ color:'#a5a5ff' }} href="https://blm.jessewalling.com" target="_blank" rel="noopener noreferrer">here</a>.</div>
            </div>
        );
    }
}

export default BLM;
