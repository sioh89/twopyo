import React from 'react';

var ResultsEntry = function(props) {
  return (
    <div>
      <p>Votes for  "{props.choice.text}": {props.choice.votes}</p>
    </div>
  );
}

export default ResultsEntry;