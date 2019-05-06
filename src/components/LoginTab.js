import React, { Component } from 'react';
import firebase from '../util/firebase';
import { connect } from 'react-redux';
import { login } from '../store/actions/user';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: false,
      emailErrorMessage: '',
      passwordError: false,
      passwordErrorMessage: '',
      userEmail: '',
    };
  }

  componentDidUpdate() {
    if (this.props.loggedIn) this.props.history.push('/home');
  }

  handleInput = (e) => {
    let emailError = this.state.emailError;
    let passwordError = this.state.passwordError;
    if (e.target.name === 'email') emailError = false;
    if (e.target.name === 'password') passwordError = false;
    this.setState({ [e.target.name]: e.target.value, emailError, passwordError });
  }

  handleLogin = () => {
    if (!this.state.email || !this.state.password) return;

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((result) => {
      console.log(result);
      firebase.auth().currentUser.getIdToken(true)
        .then(idToken => this.props.onLogin(idToken))
        .catch(error => console.error(error));
    })
    .catch((error) => {
      // there are 4 different errors. 1 for password and 3 for email.
      if (error.code === 'auth/wrong-password') {
        this.setState({ passwordError: true, passwordErrorMessage: error.message });
      } else {
        this.setState({ emailError: true, emailErrorMessage: error.message });
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

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
  }
}

const mapDispatchToProps = dispatch => ({
  onLogin: (credentials) => {
    dispatch(login(credentials));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginTab);
