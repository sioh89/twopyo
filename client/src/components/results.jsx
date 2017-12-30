import React from 'react';
import ResultsEntry from './resultsEntry.jsx';
import axios from 'axios';

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
    axios.post('/results', { pollId: this.state.pollId })
      .then(res => {
        console.log(res);
        this.setState({
          poll: res.data,
        });
      })
      .catch(error => {
        this.setState({
          poll: 'ERROR'
        });
      })
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

        <div className="card main-vote-card">

          <div className="vote-banner">
            <h1 className="card-title vote-card-title">{this.state.poll.pollTitle}</h1>
          </div>

          <div className="card-body">

            <p className="card-subtitle mb-2 text-muted">{this.state.poll.pollDesc}</p>

            <form>
              <ul className="list-group poll-choices">
                {this.state.poll.choices && this.state.poll.choices.map((choice, index) =>
                  (
                    <li
                      key={`rl-${index}`}
                      className="list-group-item d-flex justify-content-between align-items-center poll-choice-item"
                      onClick={this.selectItem}
                    >
                      {choice.text}
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