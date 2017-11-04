import React from 'react';
import $ from 'jquery';
import { Button } from 'react-bootstrap';

var PollEntry = function(props) {
  return (
    <div>
      <Button className="pollentry" bsStyle="info" block>{props.poll.pollTitle}</Button>
    </div>
  );
}


export default PollEntry;