import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import LoggedInTab from './components/LoggedInTab';
import LoggedOutTab from './components/LoggedOutTab';
import './App.css';
import firebase from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loggedIn: false,
      newEmail: '',
      newPassword: '',
      newPassword2: '',
      emailReset: '',
      tab: 0,
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
        this.setState({ loggedIn: true, user, tab: 1 });
      } else {
        // No user is signed in.
        this.setState({ loggedIn: false, user: null, tab: 0 });
      }
    });
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((result) => {
      console.log(result);
      //this.setState({ user: result.user });
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  }

  handleLogout = () => {
    firebase.auth().signOut()
    .then(() => {
      console.log('signed out successfully!');
      //this.setState({ user: null });
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

  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  }

  test = () => {
    console.log(this.state.user);
    /*
    const user = firebase.auth().currentUser;
    if (user != null) {
      console.log(user);
    } else {
      console.log('no user logged in');
    }
    */
  }

  rootHandler = (email,password) => {
    this.setState({ email, password });
  }

  render() {
    const { tab } = this.state;

    return (
      <div className="App">
      <Typography component="h4" variant="h4" gutterBottom>
        Logged in: {this.state.loggedIn ? 'true' : 'false'}
      </Typography>
        <div className="login">
          <div className="tabs">
            <Tabs value={tab} onChange={this.handleTabChange}>
              <Tab label="Login" />
              <Tab label="Logged in" disabled={!this.state.loggedIn} />
            </Tabs>
            {tab === 0 && <LoggedOutTab rootHandler={this.rootHandler} handleLogin={this.handleLogin} test={this.test} />}
            {tab === 1 && <LoggedInTab user={this.state.user} handleLogout={this.handleLogout} />}
          </div>
        </div>

        <div className="register">
          <div className="top-row">
            <Typography component="h5" variant="h5" gutterBottom>
              Register
            </Typography>
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
            <Typography component="h5" variant="h5" gutterBottom>
              Reset your password
            </Typography>
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
