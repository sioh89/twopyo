import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';
import PollsList from './pollList.jsx';
import Create from './create.jsx';
import Navbar from './navbar.js';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      polls: [],
    };
  }

  componentDidMount() {
    axios.get('/polls')
      .then(response => {
        this.setState({
          polls: response.data,
        })
        console.log(this.state.polls);
      });
  }

  render() {
    return (
      <div className="home-component">
        <Navbar />
        <div className="card main-home-card">
          <div className="to-create">
            <Link className="list-group-item list-group-item-action btn" to="/create"><h1>Create a poll</h1></Link>
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