import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';
import PollsList from './pollList.jsx';
import Create from './create.jsx';
import Navbar from './navbar.jsx';
import setAuthorizationToken from '../helpers/tokenHandler.js';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      polls: [],
    };
  }

  componentDidMount() {
    setAuthorizationToken(localStorage.getItem('token'));
    axios.get('/polls')
      .then(response => {
        this.setState({
          polls: response.data,
        })
        console.log(this.state.polls);
      })
      .catch((e) => {
        console.log('error creat`e', e.response);
        if (e.response.status === 401) {
          this.props.logout();
        }
      });
  }

  render() {
    return (
      <div className="home-component">
        <Navbar {...this.props}/>
        <div className="card main-home-card">
          <div className="to-create">
            <Link className="list-group-item list-group-item-action btn" to="/create"><h1>Create a poll</h1></Link>
          </div>
          <div className="results-label">
            Your poll results
          </div>
          <div className="polls-list">
            <PollsList polls={this.state.polls} />
          </div>
        </div>
      </div>
    );
  }
};

export default Home;