const Twetch = require("@twetch/sdk");
const clientId = "";
const twetch = new Twetch({ clientIdentifier: clientId });
class Auth {
  constructor() {
    this.authenticated = localStorage.tokenTwetchAuth || false;
  }
  anon(cb) {
    localStorage.setItem("tokenTwetchAuth", "anon");
    this.authenticated = true;
    cb();
  }
  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    localStorage.clear();
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
