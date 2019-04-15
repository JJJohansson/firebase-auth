import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';
import firebase from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'jjouhansson@gmail.com',
      password: '',
      user: null,
      loggedIn: false,
      newEmail: '',
      newPassword: '',
      newPassword2: '',
      emailReset: '',
    };
    this.fireBaseListener = this.fireBaseListener();
  }

  componentWillUnmount() {
    this.fireBaseListener = undefined;
  }

  fireBaseListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({ loggedIn: true });
        console.log(user);
      } else {
        // No user is signed in.
        console.log('no sign-in')
        this.setState({ loggedIn: false });
      }
    });
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      throw new Error(`${errorCode}: ${errorMessage}`);
    })
    .catch((error) => console.log(error));
  }

  handleLogout = () => {
    firebase.auth().signOut()
    .then(() => {
      console.log('signed out successfully!');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleRegister = () => {
    if (this.state.newPassword !== this.state.newPassword2) return;
    firebase.auth().createUserWithEmailAndPassword(this.state.newEmail, this.state.newPassword)
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  handlePasswordReset = () => {
    firebase.auth().sendPasswordResetEmail(this.state.emailReset)
    .then((response) => {
      // Email sent.
      console.log(response);
      console.log('email sent!');
    })
    .catch((error) => {
      // An error happened.
      console.log(error.code, error.message);
    });    
  }

  auth = () => {
    const user = firebase.auth().currentUser;
    if (user != null) {
      console.log(user.emailVerified);
      console.log(user);
    } else {
      console.log('no user logged in');
    }  
  }

  render() {
    return (
      <div className="App">
        <div className="login">
          <div className="top-row">
            <h2>Logged in: {this.state.loggedIn ? 'true' : 'false'}</h2>
            <TextField
              id="standard-email-input"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              value={this.state.email}
              onChange={this.handleInput}
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
              value={this.state.pswd}
            />
            <Button onClick={this.handleLogin} color="primary">
              LOG IN
            </Button>
            <Button onClick={this.handleLogout} color="primary">
              LOG OUT
            </Button>
            <Button onClick={this.auth} color="primary">
              AUTH
            </Button>
          </div>
        </div>

        <div className="register">
          <div className="top-row">
            <h2>Register</h2>
            <TextField
              id="standard-email-input"
              label="Email"
              type="email"
              name="newEmail"
              autoComplete="email"
              margin="normal"
              value={this.state.newEmail}
              onChange={this.handleInput}
            />
          </div>
          <div className="bottom-row">
            <TextField
              id="standard-password-input"
              label="Password"
              type="Password"
              name="newPassword"
              autoComplete="current-password"
              margin="normal"
              onChange={this.handleInput}
              value={this.state.newPassword}
            />
            <TextField
              id="standard-password-input"
              label="Retype password"
              type="Password"
              name="newPassword2"
              autoComplete="current-password"
              margin="normal"
              onChange={this.handleInput}
              value={this.state.newPassword2}
              error={this.state.newPassword === this.state.newPassword2 ? false : true}
            />
            <Button onClick={this.handleRegister} color="primary">
              REGISTER
            </Button>
          </div>
        </div>

        <div className="reset-password">
          <div className="top-row">
            <h2>Reset your password</h2>
          </div>
          <div className="bottom-row">
            <TextField
              id="standard-email-input"
              label="Email"
              type="email"
              name="emailReset"
              autoComplete="email"
              margin="normal"
              value={this.state.emailReset}
              onChange={this.handleInput}
            />
            <Button onClick={this.handlePasswordReset} color="primary">
              RESET
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
