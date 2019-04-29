import React, { Component } from 'react';
import auth from '../util/auth';
import { BrowserRouter, Switch, Link } from 'react-router-dom';
import { ProtectedRoute } from '../router/ProtectedRoute';
import TestPageOne from './TestPageOne';
import TestPageTwo from './TestPageTwo';
import firebase from '../firebase';

class LandingPage extends Component {

  componentDidMount() {
    console.log('Landing Page');
    console.log(this.props);
    console.log('logged in:', auth.isLoggedin());

    // gotta authenticate this at the backend before redirecting..
    try {
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        console.log('idToken', idToken);
      }).catch(function(error) {
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
    
  }

  handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log('signed out successfully!');
        auth.logout(() => {
          this.props.history.push('/');
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <nav>
              <Link to="/page1"><span>Page 1</span></Link>
                -
              <Link to="/page2"><span>Page 2</span></Link>
            </nav>
            <Switch>
              <ProtectedRoute exact path="/page1" component={TestPageOne} />
              <ProtectedRoute exact path="/page2" component={TestPageTwo} />
            </Switch>
          </div>
        </BrowserRouter>
        <button
          onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default LandingPage;
