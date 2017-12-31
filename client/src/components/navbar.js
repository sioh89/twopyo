import React from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import setAuthorizationToken from '../helpers/tokenHandler.js'

class Navbar extends React.Component {

  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }
  
  logout() {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
          <Link to="/" className="navbar-brand"><h1>Twopyo</h1></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <Link to="/home" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">Create</Link>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right ml-md-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={this.logout}>Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);