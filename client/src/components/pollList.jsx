import React from 'react';
import $ from 'jquery';
import PollEntry from './pollEntry.jsx'

let PollList = function(props) {
  return (
    <div>
      <h4>Open polls: {props.polls.length}</h4>
      {props.polls.map((poll, index) => <PollEntry poll={poll} key={index} goToResults={props.goToResults}/>)}
    </div>
  );
}

export default PollList;