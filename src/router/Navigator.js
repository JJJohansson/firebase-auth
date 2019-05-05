import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../router/ProtectedRoute';
import RootPage from '../views/RootPage';
import LandingPage from '../views/LandingPage';
import TestPageOne from '../views/TestPageOne';
import TestPageTwo from '../views/TestPageTwo';

class Navigator extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={RootPage} />
            <ProtectedRoute exact path="/home" component={LandingPage} />
            <ProtectedRoute exact path="/page1" component={TestPageOne} />
            <ProtectedRoute exact path="/page2" component={TestPageTwo} />
            <Route path="*" component={() => <h1>¯\_(ツ)_/¯</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Navigator;
