import React, { Component } from 'react';
import auth from '../util/auth';

class TestPageTwo extends Component {
  render() {
    console.log('page 2');
    console.log('logged in:', auth.isLoggedin());
    return (
      <div>
        <h1>Page 2</h1>
      </div>
    );
  }
}

export default TestPageTwo;