import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import setAuthorizationToken from '../helpers/tokenHandler.js';
import Navbar from './navbar';

class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      loginState: 'Login',
      email: '',
      password: '',
      confirmation: '',
      emailValid: true,
      passwordValid: true,
      confirmationValid: true,
    }
    this.toggleLogin = this.toggleLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmationChange = this.handleConfirmationChange.bind(this);
    this.validateEmailFormat = this.validateEmailFormat.bind(this);
  }

  toggleLogin() {
    if (this.state.loginState === 'Login') {
      this.setState({
        loginState: 'Sign Up',
        password: '',
        confirmation: '',
        emailValid: true,
        passwordValid: true,
        confirmationValid: true,
      });
    }

    if (this.state.loginState === 'Sign Up') {
      this.setState({
        loginState: 'Login',
        password: '',
        confirmation: '',
        emailValid: true,
        passwordValid: true,
        confirmationValid: true,
      });
    }
  }

  handleLogin(e) {
    e.preventDefault();

    const eVal = this.validateEmailFormat(this.state.email);
    const pVal = this.state.password.length >= 6 && this.state.password.length <= 20;
    const cVal = this.state.confirmation === this.state.password;

    this.setState({
      emailValid: eVal,
      passwordValid: pVal,
      confirmationValid: cVal,
    }, () => {
        if (this.state.loginState === 'Sign Up'
            && this.state.emailValid
            && this.state.passwordValid
            && this.state.confirmationValid) {
          axios.post('/createUser', {
            name: this.state.email,
            password: this.state.password,
          })
          .then((res) => {
            if (res.status === 204) {
              console.log('204: user already exists');
              //~~~~ERROR HANDLING~~~~//
            } else if (res.status === 400) {
              console.log('400: error in sign up. try again');
            } else {
              //~~~SUCCESS~~~//
              console.log('RESPONSE: ', res);

              const token = res.data.accessToken;
              this.props.login(token);
              this.setState({
                email: '',
                password: '',
                confirmation: '',
              });
              this.props.history.push('/home');         
            }
          });
        }

        if (this.state.loginState === 'Login'
            && this.state.emailValid
            && this.state.passwordValid) {
          axios.post('/authUser', {
            name: this.state.email,
            password: this.state.password,
          })
            .then(res => {
              if (res.status === 204) {
                console.log('204: user not authenticated')
              } else if (res.status === 400) {
                console.log('400: error in authentication. try again');
              } else {
                //~~~SUCCESS~~~//
                console.log('RESPONSE: ', res);

                const token = res.data.accessToken;
                this.props.login(token);
                this.setState({
                  email: '',
                  password: '',
                  confirmation: '',
                });
                this.props.history.push('/home'); 
              }
            });
        }
      }
    );
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value});
  }

  handleConfirmationChange(e) {
    this.setState({ confirmation: e.target.value});
  }

  validateEmailFormat(email) {
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email.toLowerCase());
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/home" {...this.props} />
    }

    return (
      <div className="landing-component">
        <Navbar {...this.props}/>

        <div className="container landing-container">
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
              <label className="input-label" for="inputEmail">Email address</label>
              <input type="email" value={this.state.email} className={`form-control landing-card-login-input${this.state.emailValid ? '' : ' input-error'}`} id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmailChange}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group password-form-group row">
              <div className="col-md">
                <label className="input-label" for="inputPassword">Password</label>
                <input type="password" value={this.state.password} className={`form-control landing-card-login-input${this.state.passwordValid ? '' : ' input-error'}`} id="inputPassword" aria-describedby="passwordHelp" placeholder="Password" onChange={this.handlePasswordChange}/>
                <small id="passwordHelp" className="form-text text-muted" style={{visibility: this.state.loginState === 'Sign Up' ? 'visible' : 'hidden'}}>Your password must be 6-20 characters</small>
              </div>
              <div className="col-md" style={{display: this.state.loginState === 'Sign Up' ? 'block' : 'none'}}>
                <label for="inputConfirmation">Confirm</label>
                <input type="password" value={this.state.confirmation} className={`form-control landing-card-login-input${this.state.confirmationValid ? '' : ' input-error'}`} id="inputConfirmation" aria-describedby="confirmationHelp" placeholder="Confirm password" onChange={this.handleConfirmationChange}/>
                <small id="confirmationHelp" className="form-text text-muted">Please type your password again.</small>
              </div>
            </div>

            <div className="login-btn-container">
                <span className="login-signup-change" onClick={this.toggleLogin}>{'Click here to go to ' + this.state.loginState}</span>
                <button type="submit" className="btn btn-outline-primary landing-login-card-btn" onClick={this.handleLogin}>{this.state.loginState}</button>
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