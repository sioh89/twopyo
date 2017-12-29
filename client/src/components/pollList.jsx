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
      <h4 class="">Open polls: {props.polls.length}</h4>
      <div className="list-group">
        {props.polls.map((poll, index) => 
          (
            <Link className="list-group-item list-group-item-action poll-item" key={index} to={{pathname: `/results/${poll.pollId}`}}>
              <div className="poll-list-item-title">{poll.pollTitle}</div>
              <div className="poll-list-item-id">{poll.pollId}</div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default PollList;