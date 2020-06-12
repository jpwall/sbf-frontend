import React, { Component } from 'react';
import './../Global.css';

class Footer extends Component {
    render() {
        return (
            <footer>
              <div><a href="/about">About and FAQ</a>|</div>
              <div><a href="mailto:jpwall@uw.edu?subject=STUDIUS support / feedback:" target="_blank" rel="noopener noreferrer">Support and Feedback</a>|</div>
              <div><a href="/donate">Donate</a></div>
            </footer>
        );
    }
}

export default Footer;
