import React, { Component } from 'react';
import authenticationService from './../authHelpers/AuthenticationService';
import Header from './../components/Header';
import Footer from './../components/Footer';
import './../Global.css';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authenticationService.currentUserValue
        };
    }
    
    render() {
        return (
            <React.Fragment>
              <Header currentUser={this.state.currentUser} />
              <div className="primaryContainer">
                <div className="internalContainer" id="internalOverride">
                  <h1>About STUDIUS</h1>
                  
                  <h2>The Study Buddy Problem:</h2>
                  <p>It's hard to find study buddies. For many, social anxiety (especially during large lectures) is challenging to overcome and strike up a conversation with a stranger. For others, the person sitting next to them might not have the same desired grade. STUDIUS aims to solve both these problems, providing a space to find other study buddies and list yourself as one if you have different GPA expectations in the class.</p>
                  <p>In light of the COVID-19 pandemic, it's even more difficult to find study buddies. STUDIUS was initially inspired by the increased disconnect between peers from Zoom lectures.</p>

                  <h2>The Team:</h2>
                  <p>STUDIUS is developed by UW students for UW students. It is currently being actively maintained by an HCDE major <span role="img" aria-label="emoji heart">❤</span> (and CS reject <span role="img" aria-label="emoji middle finger">🖕</span>), Jesse Walling, with intermittent help from other students. If you are interested in the project, feel free to <a href="/donate">donate</a> or <a href="mailto:jessephilipwalling@gmail.com?subject=STUDIUS interest:" target="_blank" rel="noopener noreferrer">email us</a> with how you would like to help!</p>

                  <h2>The Software:</h2>
                  <p>STUDIUS is powered by React, Express.js, JSON Web Tokens / Passport, and CSS Flexbox for the UI. If you find bugs or vulnerabilities (kudos if you can <span role="img" aria-label="emoji winking smiley face">😉</span>), please email <a href="mailto:jessephilipwalling@gmail.com?subject=STUDIUS bug / vulnerability:" target="_blank" rel="noopener noreferrer">support</a>.</p>

                  <h1>FAQ</h1>
                  <h2>Are there any rules?</h2>
                  <p>Yes, but common sense ones:</p>
                  <ul>
                    <li>Be transparent. List the grade that you actually desire in the class!</li>
                    <li>This site is for study buddy finding. It's not Tinder, sorry!</li>
                    <li>Remove yourself from a class listing if you have a buddy / group that you are satisfied with.</li>
                    <li>Be yourself and have fun!</li>
                  </ul>
                  <h2>How is STUDIUS pronounced?</h2>
                  <p>Like the correctly spelled english word, studious.</p>
                  <h2>Why isn't there a built in chat to avoid using phone numbers?</h2>
                  <p>The current state of STUDIUS is a minimum viable product (MVP). It was much faster to implement lists of phone numbers for contact information. A built in chat service could be a feature in later versions.</p>
                  <h2>My friend goes to X university, is STUDIUS available for them?</h2>
                  <p>No, currently STUDIUS is intended for UW-Seattle students only. Expansion to other colleges is a long-term goal though!</p>
                  <h2>Is STUDIUS officially affiliated with UW?</h2>
                  <p>NO <span role="img" aria-label="emoji devil horns smiling">😈</span> But, if UW is interested in a partnership of some sort, we might be open to it <span role="img" aria-label="emoji big eyes">👀</span></p>
                </div>
              </div>
              <Footer />
            </React.Fragment>
        );
    }
}

export default About;
