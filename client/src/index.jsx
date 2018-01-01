import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom';
import $ from 'jquery';
import PollList from './components/pollList.jsx';
import Create from './components/create.jsx';
import Results from './components/results.jsx';
import Vote from './components/vote.jsx';
import Home from './components/home.jsx';
import Landing from './components/landing.jsx';
import setAuthorizationToken from './helpers/tokenHandler.js';
import Auth from './helpers/isAuthenticated.jsx';
import './styles.css';

if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
}

class App extends React.Component {
  
  constructor(props) {
    super(props);

    // check if logged in
    const token = localStorage.getItem('token');
    let loggedIn = false;
    if (token) {
      loggedIn = true;
    }

    this.state = {
      isAuthenticated: loggedIn,
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  login(token) {
    localStorage.setItem('token', token);
    setAuthorizationToken(token);
    this.setState({
      isAuthenticated: true,
    })
  }

  logout() {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    this.setState({
      isAuthenticated: false,
    });
  }

  render() {
    return (
      <div>
        <Router>
          <div>            
            <Switch>
              <Route exact path="/" render={(props) => <Landing {...props}            isAuthenticated={this.state.isAuthenticated} logout={this.logout} login={this.login}/>} />
              <Route path="/home" render={(props) => <Auth {...props} comp={Home}     isAuthenticated={this.state.isAuthenticated} logout={this.logout} />} />
              <Route path="/create" render={(props) => <Auth {...props} comp={Create} isAuthenticated={this.state.isAuthenticated} logout={this.logout} />} />
              <Route path="/results/:id" render={(props) => <Results {...props}       isAuthenticated={this.state.isAuthenticated} logout={this.logout} />} />
              <Route path="/:id" render={(props) => <Vote {...props}                  isAuthenticated={this.state.isAuthenticated} logout={this.logout} />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));