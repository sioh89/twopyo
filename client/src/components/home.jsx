import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';
import PollsList from './pollList.jsx';
import Create from './create.jsx';

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
        <div className="btn to-create">
          <Link to="/create">Create a poll</Link>
        </div>
        <div className="list">
          <PollsList polls={this.state.polls} />
        </div>
      </div>
    );
  }
};

export default Home;