import React, { Component } from 'react';
import { BrowserRouter, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/user';
import ProtectedRoute from '../router/ProtectedRoute';
import TestPageOne from './TestPageOne';
import TestPageTwo from './TestPageTwo';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user,
    };
  }

  componentDidUpdate() {
    if (!this.props.loggedIn) this.props.history.push('/');
  }
  
  handleLogout = () => {
    this.props.onLogout();
  }

  render() {
    return (
      <div>
        <h1>Hello {this.state.email}!</h1>
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
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    loggedIn: state.user.loggedIn,
  }
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
