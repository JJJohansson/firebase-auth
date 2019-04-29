import React, { Component } from 'react';
import firebase from '../firebase';
import auth from '../util/auth';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'jjouhansson@gmail.com',
      password: '',
      emailError: false,
      emailErrorMessage: '',
      passwordError: false,
      passwordErrorMessage: '',
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

  handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        console.log(result);
        auth.login(() => {
          this.props.history.push('/home');
        });
      })
      .catch((error) => {
        console.log(error);
        switch(error.code) {
          case 'auth/invalid-email':
            this.setState({ emailError: true, emailErrorMessage: error.message });
            break;
            
          case 'auth/user-disabled':
            this.setState({ emailError: true, emailErrorMessage: error.message });
            break;
          
          case 'auth/user-not-found':
            this.setState({ emailError: true, emailErrorMessage: error.message });
            break;

          case 'auth/wrong-password':
            this.setState({ passwordError: true, passwordErrorMessage: error.message });
            break;

          default:
            break;
        }
      });
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
            onChange={this.handleInput}
            error={this.state.emailError}
            helperText={this.state.emailError ? this.state.emailErrorMessage : ''}
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
            onChange={this.handleInput}
            value={this.state.password}
            error={this.state.passwordError}
            helperText={this.state.passwordError ? this.state.passwordErrorMessage : ''}
          />
          <Button onClick={this.handleLogin} color="primary">
            LOG IN
          </Button>
        </div>
      </div>
    );
  }
}

export default LoginTab;