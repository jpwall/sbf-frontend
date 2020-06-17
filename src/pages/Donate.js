import React, { Component } from 'react';
import authenticationService from './../authHelpers/AuthenticationService';
import Header from './../components/Header';
import Footer from './../components/Footer';
import './../Global.css';

class Donate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authenticationService.currentUserValue
        };
    }
    
    render() {
        return(
            <React.Fragment>
              <Header currentUser={this.state.currentUser} />
              <div className="primaryContainer">
                <div className="internalContainer" id="internalOverride">
                  <h1>Donate</h1>
                  <p>Venmo: @jpwall</p>
                  <p>BTC (Bitcoin): 1NzBYg1jyLJFVmvWTGvQ5XhmTqzTYi4oj</p>

                  <h2>How will my donation be spent?</h2>
                  <p>Your donation will be used to cover server, hosting, and phone verification costs. As it currently stands, donations are not being used for profit. Your donation will be allocated to anything related to development and maintenance of STUDIUS.</p>
                  <p>Any Bitcoin donations will be held and withdrawn from as necessary when dictated depending on the state of the market for the given purposes above.</p>
                </div>
              </div>
              <Footer />
            </React.Fragment>
        );
    }
}

export default Donate;
