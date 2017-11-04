import React from 'react';
import ResultsEntry from './resultsEntry.jsx';

let Results = function(props) {
  return (
    <div>
      <h4>{props.resultsData.pollTitle}</h4>
      <p>{props.resultsData.pollDesc}</p>
      {props.resultsData.choices.map((choice, index) => 
        <ResultsEntry choice={choice} key={index}/>
      )}
    </div>
  );
}

export default Results;