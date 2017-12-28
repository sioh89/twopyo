import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import {
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import PollEntry from './pollEntry.jsx'

let PollList = function(props) {
  console.log('from polllist', props.polls[0]);
  return (
    <div>
      <h4>Open polls: {props.polls.length}</h4>
      <ListGroup>
        {props.polls.map((poll, index) => 
          (
            <ListGroupItem key={index}>
              <Link to={{pathname: `/results/${poll.pollId}`}}>
                {poll.pollTitle} / {poll.pollId}
              </Link>
            </ListGroupItem>
          )
        )}
      </ListGroup>
    </div>
  );
}

export default PollList;