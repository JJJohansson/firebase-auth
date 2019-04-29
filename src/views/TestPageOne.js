import React, { Component } from 'react';
import auth from '../util/auth';

class TestPageOne extends Component {
  render() {
    console.log('page 1');
    console.log('logged in:', auth.isLoggedin());
    return (
      <div>
        <h1>Page 1</h1>
      </div>
    );
  }
}

export default TestPageOne;