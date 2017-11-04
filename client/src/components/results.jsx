import React from 'react';
import ResultsEntry from './resultsEntry.jsx';
import { Button } from 'react-bootstrap';

let Results = function(props) {
  return (
    <div>
      <h4>{props.resultsData.pollTitle}</h4>
      <p>{props.resultsData.pollDesc}</p>
      {props.resultsData.choices.map((choice, index) => 
        <ResultsEntry choice={choice} key={index}/>
      )}
      <Button bsStyle="success" bsSize="large" onClick={props.goToIndex} block>Go home!</Button>
    </div>
  );
}

export default Results;