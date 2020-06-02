import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Course from './pages/Course';
import NewCourse from './pages/NewCourse';
import AddPhone from './pages/AddPhone';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
      <div>
	<Route exact path='/' component={App} />
	<Route path='/login' component={Login} />
	<Route path='/register' component={Register} />
	<PrivateRoute path='/course/:cid' component={Course} />
	<PrivateRoute path='/newCourse' component={NewCourse} />
        <PrivateRoute path='/addPhone/:cid' component={AddPhone} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
      </div>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
