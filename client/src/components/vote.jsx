import React from 'react';
import axios from 'axios';
import {
  Link,
  Redirect,
} from 'react-router-dom';
import Navbar from './navbar.js';

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollId: this.props.match.params.id,
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
    axios.post('/castVote', {
      pollId: this.state.pollId,
      choiceNumber: this.state.selected,
    })
      .then(res => {
        console.log('cast vote', res)
        this.setState({
          voted: true,
        });
      })
      .catch(err => {
        console.log('cast vote err', err);
      })
  }

  componentDidMount() {
    axios.post('/pollById', {pollId: this.state.pollId})
      .then(res => {
        this.setState({
          poll: res.data,
        })
      })
  }

  render() {
    if (!this.state.poll.pollId)
      return (
        <div onLoad={this.removeModal}>
          COULD NOT FIND POLL
        </div>
      );

    if (this.state.voted) {
      return <Redirect to={`/results/${this.state.pollId}`} />;
    }

    return (
      <div className="vote-component">
        <Navbar />

        <div className="card main-vote-card">

          <div className="vote-banner">
            <h1 className="card-title vote-card-title">{this.state.poll.pollTitle}</h1>
          </div>

          <div className="card-body">

            <p className="card-subtitle mb-2 text-muted">{this.state.poll.pollDesc}</p>

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
                      {choice.text}
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
            <Link to={`/results/${this.state.pollId}`}><p id="result-link-text">Go to results</p></Link>
          </div>
        </div>

      </div>
    );
  }
}

export default Vote;