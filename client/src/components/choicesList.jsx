import React from 'react';
import Form from 'react-bootstrap/lib/Form.js';
import FormControl from 'react-bootstrap/lib/FormControl.js';
import HelpBlock from 'react-bootstrap/lib/HelpBlock.js';
import ChoiceEntry from './choiceEntry.jsx';

class ChoicesList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id="choiceslist">
        {this.props.choicesValues.map((choice, index) => {
          return <ChoiceEntry
            key={index}
            index={index}
            choicesValues={this.props.choicesValues}
            choiceValueChange={this.props.choiceValueChange}
            choiceAddLength={this.props.choiceAddLength}
            />
        })}
      </div>
    )
  }
}

export default ChoicesList;