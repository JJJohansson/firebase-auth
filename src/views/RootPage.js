import React, { Component } from 'react';
import '../App.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BrowserRouter, Switch } from 'react-router-dom';
import ProtectedRoute from '../router/ProtectedRoute';
import LoginTab from '../components/LoginTab';
import RegistrationTab from '../components/RegistrationTab';
import PasswordResetTab from '../components/PasswordResetTab';
import LandingPage from './LandingPage';

class RootPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
    };
  }

  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  }

  render() {
    const { tab } = this.state;
    return (
      <BrowserRouter>
        <div className="login">
          <Tabs value={tab} onChange={this.handleTabChange}>
            <Tab label="Login" />
            <Tab label="Register" />
            <Tab label="Forgot your password?" />
          </Tabs>
          {tab === 0 && <LoginTab history={this.props.history} />}
          {tab === 1 && <RegistrationTab />}
          {tab === 2 && <PasswordResetTab />}
        </div>
        <div>
          <Switch>
            <ProtectedRoute exact path="/home" component={LandingPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default RootPage;
