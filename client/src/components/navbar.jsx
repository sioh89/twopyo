import React from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import setAuthorizationToken from '../helpers/tokenHandler.js'

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);
  }
  
  logoutHandler() {
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between navbar-fixed-top">
  
            <Link to="/home" className="navbar-brand"><h1>Twopyo</h1></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
  
              <ul className="nav navbar-nav navbar-right ml-md-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link" id="log-text" onClick={this.logoutHandler}>Login</Link>
                </li>
              </ul>
            </div>
  
          </nav>
        </div>
      );
    }

    if (this.props.isAuthenticated) {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between navbar-fixed-top">
  
            <Link to="/home" className="navbar-brand"><h1>Twopyo</h1></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
  
              <ul className="nav navbar-nav">
                <li className="nav-item">
                  <Link to="/home" id="home-nav-link" className="nav-link nav-link-on-left">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/create" id="create-nav-link" className="nav-link nav-link-on-left">Create</Link>
                </li>
              </ul>
  
              <ul className="nav navbar-nav navbar-right ml-md-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link" id="log-text" onClick={this.logoutHandler}>Logout</Link>
                </li>
              </ul>
            </div>
  
          </nav>
        </div>
      );
    }
  }
}

export default withRouter(Navbar);