import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SnackbarNotification from './SnackbarNotification';
import firebase from '../util/firebase';
import '../App.css';

class PasswordResetTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: false,
      errorMessage: '',
      resetSuccess: false,
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handlePasswordReset = () => {
    firebase.auth().sendPasswordResetEmail(this.state.email)
      .then((response) => {
        // Email sent.
        console.log(response);
        console.log('email sent!');
        this.setState({ emailSent: true, error: false, errorMessage: '', resetSuccess: true });
      })
      .catch((error) => {
        // An error happened.
        console.log(error.code, error.message);
        this.setState({ error: true, errorMessage: error.message });
      });
  }

  render() {
    return (
      <div className="reset-password">
        <SnackbarNotification open={this.state.resetSuccess} message={'Password reset link sent to email!'} />
        <div className="bottom-row">
          <TextField
            id="standard-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            value={this.state.email}
            onChange={this.handleInput}
            error={this.state.error}
            helperText={this.state.error ? this.state.errorMessage : ''}
          />
          <Button onClick={this.handlePasswordReset} color="primary">
            RESET
          </Button>
        </div>
      </div>
    );
  }
}

export default PasswordResetTab;