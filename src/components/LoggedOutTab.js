import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoggedOutTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'jjouhansson@gmail.com',
      password: '',
    };
  }

  handler = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => this.props.rootHandler(this.state.email, this.state.password));
  }

  render() {
    return (
      <div>
        <div className="top-row">
          <TextField
            id="standard-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            value={this.state.email}
            onChange={this.handler}
          />
        </div>
        <div className="bottom-row">
          <TextField
            id="standard-password-input"
            label="Password"
            type="Password"
            name="password"
            autoComplete="current-password"
            margin="normal"
            onChange={this.handler}
            value={this.state.password}
          />
          <Button onClick={this.props.handleLogin} color="primary">
            LOG IN
          </Button>
          <Button onClick={this.props.test} color="primary">
            TEST
          </Button>
        </div>
      </div>
    );
  }
}

export default LoggedOutTab;