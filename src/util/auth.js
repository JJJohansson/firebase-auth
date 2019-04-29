class Auth {
  constructor() {
    this.loggedIn = false;
  }

  login(cb) {
    this.loggedIn = true;
    cb();
  }

  logout(cb) {
    this.loggedIn = false;
    cb();
  }

  isLoggedin() {
    return this.loggedIn;
  }
}

export default new Auth();
