class Auth {
  constructor() {
    this.loggedIn = false;
  }

  login(callback) {
    this.loggedIn = true;
    callback();
  }

  logout(callback) {
    this.loggedIn = false;
    callback();
  }

  isLoggedin() {
    return this.loggedIn;
  }
}

export default new Auth();
