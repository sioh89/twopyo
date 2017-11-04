import React from 'react';
import $ from 'jquery';
import { Button } from 'react-bootstrap';

class PollEntry extends React.Component {
  constructor(props) {
    super(props);
    this.goToResults = this.goToResults.bind(this);
  }

  goToResults() {
    let fetchUrl = 'http://localhost:3000/results/' + this.props.poll.pollId;
    $.ajax({
      url: fetchUrl,
      type: 'GET',
      success: (data) => {
        this.props.goToResults(data);
      }
    })
  }

  render() {
    return (
      <div>
        <Button className="pollentry" bsStyle="info" onClick={this.goToResults} block>{this.props.poll.pollTitle} /{this.props.poll.pollId}</Button>
      </div>
    );
  }
}


export default PollEntry;