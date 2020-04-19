import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Course from './Course';
import NewCourse from './NewCourse';
import Login from './Login';
import Register from './Register';
import PrivateRoute from './components/PrivateRoute';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
      <Router>
	<div>
	  <Route exact path='/' component={App} />
	  <Route path='/login' component={Login} />
	  <Route path='/register' component={Register} />
	<PrivateRoute path='/course/:name' component={Course} />
	<PrivateRoute path='/newCourse' component={NewCourse} />
	</div>
      </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
