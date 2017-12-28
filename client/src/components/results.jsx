import React from 'react';
import ResultsEntry from './resultsEntry.jsx';
import { Button } from 'react-bootstrap';
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
    return (this.state.pollResults === 'ERROR') ?
      (
        <div>
          COULD NOT FIND POLL
        </div>
      )
    :
      (
        <div>
          {JSON.stringify(this.state.pollResults)}
        </div>
      )
  }
}

export default Results;