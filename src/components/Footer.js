import React, { Component } from 'react';
import './../Global.css';

class Footer extends Component {
    render() {
        return (
            <footer>
              <div><a href="/about">About and FAQ</a>|</div>
              <div><a href="mailto:jessephilipwalling@gmail.com?subject=STUDIUS support:" target="_blank" rel="noopener noreferrer">Support</a>|</div>
              <div><a href="https://forms.gle/uUGDfmDKthyWFDiV9" target="_blank" rel="noopener noreferrer">Feedback</a>|</div>
              <div><a href="/donate">Donate</a></div>
            </footer>
        );
    }
}

export default Footer;
