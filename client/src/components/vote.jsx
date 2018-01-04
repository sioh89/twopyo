import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import {
  Link,
  Redirect,
} from 'react-router-dom';
import Navbar from './navbar.jsx';
import Share from './share.jsx';
import setAuthorizationToken from '../helpers/tokenHandler.js'

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollLink: this.props.match.params.id,
      poll: {},
      selected: -1,
      voted: false,
    };
    this.selectItem = this.selectItem.bind(this);
    this.registerVote = this.registerVote.bind(this);
  }

  selectItem(e) {
    e.preventDefault();
    $(".poll-choice-item").removeClass("active");
    $(e.target).addClass("active");
    this.setState({
      selected: e.target.value,
    });
  }

  registerVote() {
    setAuthorizationToken(localStorage.getItem('token'));
    axios.post('/castVote', {
      choiceNumber: this.state.selected,
    })
      .then(res => {
        // console.log('cast vote', res)
        this.setState({
          voted: true,
        });
      })
      .catch((e) => {
        // console.log('error creat`e', e.response);
        if (e.response.status === 401) {
          this.props.logout();
        }
      });
  }

  componentDidMount() {
    setAuthorizationToken(localStorage.getItem('token'));
    axios.post('/pollById', {pollLink: this.state.pollLink})
      .then(res => {
        this.setState({
          poll: res.data,
        })
      })
      .catch((e) => {
        // console.log('error creat`e', e.response);
        if (e.response.status === 401) {
          this.props.logout();
        }
      })
  }

  render() {
    if (!this.state.poll.pollLink)
      return (
        <div onLoad={this.removeModal}>
          COULD NOT FIND POLL
        </div>
      );

    if (this.state.voted) {
      return <Redirect to={`/results/${this.state.pollLink}`} />;
    }

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
              <ul className="list-group poll-choices"  onClick={this.selectItem.bind(this)}>
                {this.state.poll.choices && this.state.poll.choices.map((choice) =>
                  (
                    <li
                      key={choice.id}
                      value={choice.id}
                      className="list-group-item list-group-item-action poll-choice-item"
                      onClick={this.selectItem}
                    >
                      {_.unescape(choice.text)}
                    </li>
                  )
                )}
              </ul>
            </form>

          </div>
          <div className="btn-container">
            <button
              className="btn btn-primary"
              disabled={this.state.selected === -1}
              onClick={this.registerVote}
            >
              Vote
            </button>
            <Link to={`/results/${this.state.pollLink}`}><p id="result-link-text">Go to results</p></Link>
          </div>
        </div>

        <Share/>
      </div>
    );
  }
}

export default Vote;