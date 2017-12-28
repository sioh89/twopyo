import React from 'react';
import ResultsEntry from './resultsEntry.jsx';
import {
  Button,
  Panel,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import axios from 'axios';

class Results extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      pollId: props.match.params.id,
      pollResults: {},

    }
  }

  componentDidMount() {
    axios.post('/results', { pollId: this.state.pollId })
      .then(res => {
        console.log(res);
        this.setState({
          pollResults: res.data,
        });
      })
      .catch(error => {
        this.setState({
          pollResults: 'ERROR'
        });
      })
  }

  render() {
    return (this.state.pollResults === 'ERROR' || !this.state.pollResults.pollId) ?
      (
        <div>
          COULD NOT FIND POLL
        </div>
      )
    :
      (
        <div>
          {JSON.stringify(this.state.pollResults)}
          <Panel defaultExpanded header={this.state.pollResults.pollTitle}>
            {this.state.pollResults.pollDesc}
            <ListGroup fill>
              {this.state.pollResults.choices.map(choice => 
                (
                  <ListGroupItem>
                    <span>{choice.text}</span> <span>{choice.votes}</span>
                  </ListGroupItem>
                )
              )}
            </ListGroup>
          </Panel>
        </div>
      )
  }
}

export default Results;