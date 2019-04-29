import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../router/ProtectedRoute';
import RootPage from '../views/RootPage';
import LandingPage from '../views/LandingPage';

class Navigator extends Component {
  render() {
    console.log(this.props.path)
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={RootPage} />
            <ProtectedRoute exact path="/home" component={LandingPage} />
            <Route path="*" component={() => <h1>¯\_(ツ)_/¯</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Navigator;