import React from 'react';

class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      loginState: 'Login',
    }
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  toggleLogin() {
    if (this.state.loginState === 'Login') {
      this.setState({ loginState: 'Sign Up'});
    }

    if (this.state.loginState === 'Sign Up') {
      this.setState({ loginState: 'Login'});
    }
  }

  render() {
    return (
      <div className="landing-component">
        
        <div className="container">
        <div className="row">


        <div className="card landing-vote-card col-md">
          <div className="green-banner">
            <p className="green-banner-text">Vote</p>
          </div>

          <div className="landing-card-vote-form">
            <div className="input-group mb-3 landing-card-input-group">
              <input
                type="text"
                className="form-control landing-card-vote-input"
                placeholder="Poll ID"
                aria-label="poll-id"
                aria-describedby="voteIdHelp"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-primary landing-vote-card-btn" type="button">Go!</button>
              </div>
            </div>
            <small id="voteIdHelp" className="form-text text-muted vote-id-help">Enter the poll ID that was shared with you.</small>
          </div>
        </div>


        <div className="card landing-login-card col-md">
          <div className="blue-banner">
            <p className="blue-banner-text">{this.state.loginState}</p>
          </div>

          <form className="landing-login-form">
            <div className="form-group email-form-group">
              <label for="inputEmail">Email address</label>
              <input type="email" className="form-control landing-card-login-input" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group password-form-group row">
              <div class="col-md">
                <label for="inputPassword">Password</label>
                <input type="password" className="form-control landing-card-login-input" id="inputPassword" placeholder="Password"/>
              </div>
              <div class="col-md" style={{display: this.state.loginState === 'Sign Up' ? 'block' : 'none'}}>
                <label for="inputPassword">Confirm</label>
                <input type="password" className="form-control landing-card-login-input" id="inputPassword" placeholder="Confirm password"/>
              </div>
            </div>

            <div className="login-btn-container">
                <span className="login-signup-change" onClick={this.toggleLogin}>{'Click here to go to ' + this.state.loginState}</span>
                <button type="button" className="btn btn-outline-primary landing-login-card-btn">{this.state.loginState}</button>
            </div>

          </form>
        </div>

        </div>
        </div>

      </div>
    );
  }
}

export default Landing;