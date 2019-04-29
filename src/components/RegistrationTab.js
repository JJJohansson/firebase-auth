import React, { Component } from 'react';
import auth from '../util/auth';
import firebase from '../util/firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SnackbarNotification from './SnackbarNotification';

class RegistrationTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      retypePassword: '',
      emailError: false,
      emailErrorText: '',
      passwordError: false,
      passwordErrorText: '',
      registrationSuccess: false,
    };
  }

  componentDidMount() {
    console.log(this.props);
    console.log('logged in:', auth.isLoggedin());
  }

  handleInput = (e) => {
    let emailError = this.state.emailError;
    let passwordError = this.state.passwordError;
    if (e.target.name === 'email') emailError = false;
    if (e.target.name === 'password') passwordError = false;
    this.setState({ [e.target.name]: e.target.value, emailError, passwordError });
  }

  handleRegister = () => {
    if (this.state.newPassword !== this.state.newPassword2) return;
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        console.log(response);
        this.setState({ emailError: false, passwordError: false, registrationSuccess: true });
      })
      .catch((error) => {
        // Handle Errors here.
        if (error.code === 'auth/invalid-email' || error.code === 'auth/email-already-in-use') {
          this.setState({ emailError: true, emailErrorText: error.message });
        }
        if (error.code === 'auth/weak-password') {
          this.setState({ passwordError: true, passwordErrorText: error.message });
        }
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  render() {
    return (
      <div className="register">
        <SnackbarNotification open={this.state.registrationSuccess} message={'Registration successful!'} />
        <div className="top-row">
          <TextField
            id="standard-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            value={this.state.email}
            onChange={this.handleInput}
            error={this.state.emailError}
            helperText={this.state.emailError ? this.state.emailErrorText : ''}
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
            value={this.state.password}
            onChange={this.handleInput}
            error={this.state.passwordError}
            helperText={this.state.passwordError ? this.state.passwordErrorText : ''}
          />
          <TextField
            id="standard-password-input"
            label="Retype password"
            type="Password"
            name="retypePassword"
            autoComplete="current-password"
            margin="normal"
            value={this.state.retypePassword}
            onChange={this.handleInput}
            error={this.state.password !== this.state.retypePassword ? true : false}
            helperText={this.state.password !== this.state.retypePassword ? 'Password does not match' : ''}
          />
          <Button onClick={this.handleRegister} color="primary">
            REGISTER
        </Button>
        </div>
      </div>
    );
  }
}

export default RegistrationTab;