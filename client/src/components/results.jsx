import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import Navbar from './navbar.jsx';
import setAuthorizationToken from '../helpers/tokenHandler.js'

class Results extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      pollId: props.match.params.id,
      poll: {},
    }
  }

  componentDidMount() {
    setAuthorizationToken(localStorage.getItem('token'));
    axios.post('/results', { pollId: this.state.pollId })
      .then(res => {
        console.log(res);
        this.setState({
          poll: res.data,
        });
      })
      .catch(error => {
        console.log('error creat`e', e.response);
        if (e.response.status === 401) {
          this.props.logout();
        }
        this.setState({
          poll: 'ERROR'
        });
      });
  }

  render() {
    if (this.state.poll === 'ERROR' || !this.state.poll.pollId)
      return (
        <div onLoad={this.removeModal}>
          COULD NOT FIND POLL
        </div>
      );
    
    return (
      <div className="vote-component">
        <Navbar {...this.props}/>

        <div className="card main-vote-card">

          <div className="vote-banner">
            <h1 className="card-title vote-card-title">{_.unescape(this.state.poll.pollTitle)}</h1>
          </div>

          <div className="card-body">

            <p className="card-subtitle mb-2 text-muted">{_.unescape(this.state.poll.pollDesc)}</p>

            <form>
              <ul className="list-group poll-choices">
                {this.state.poll.choices && this.state.poll.choices.map((choice, index) =>
                  (
                    <li
                      key={`rl-${index}`}
                      className="list-group-item d-flex justify-content-between align-items-center poll-choice-item"
                      onClick={this.selectItem}
                    >
                      {_.unescape(choice.text)}
                      <span className="badge badge-primary badge-pill">{choice.votes}</span>
                    </li>
                  )
                )}
              </ul>
            </form>

          </div>

        </div>
      </div>
    );
  }
}

export default Results;