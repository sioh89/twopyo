import React from 'react';
import Form from 'react-bootstrap/lib/Form.js';
import FormControl from 'react-bootstrap/lib/FormControl.js';
import HelpBlock from 'react-bootstrap/lib/HelpBlock.js';

class ChoiceEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <FormControl
        type="text"
        value={this.props.choicesValues[this.props.index]}
        placeholder="More information (optional)"
        onChange={this.props.choiceValueChange}
        maxLength="160"
        className={JSON.stringify(this.props.index)}
        ></FormControl>
        <HelpBlock>{this.props.choicesValues[this.props.index].length}/160</HelpBlock>
      </div>
    );
  }
}

export default ChoiceEntry;