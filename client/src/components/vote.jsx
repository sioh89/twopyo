import React from 'react';
import axios from 'axios';
import {
  FormGroup,
  Radio,
  Button,
  Jumbotron,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollId: this.props.match.params.id,
      poll: {},
      selected: -1,
    };
  }

  selectItem(e) {
    e.preventDefault();
    console.log('selected', e.target.value);
    this.setState({
      selected: e.target.value,
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
    return (
      <div>
        {JSON.stringify(this.state.poll)}
        <form>
          <div className="jumbotron">
            <h1 className="poll-title">{this.state.poll.pollTitle}</h1>
            <p className="poll-description">{this.state.poll.pollDesc}</p>
            <ul className="list-group poll-choices"  onClick={this.selectItem.bind(this)}>
              {this.state.poll.choices && this.state.poll.choices.map((choice) =>
                (
                  <li key={choice.id} value={choice.id} className="list-group-item poll-choice-item">
                    {choice.text}
                    <div>
                      <img src="left.svg" className="selected-icon" style={{visibility: this.state.selected === this.value ? 'visible' : 'hidden' }}/>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default Vote;