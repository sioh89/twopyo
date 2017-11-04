import React from 'react';
import Form from 'react-bootstrap/lib/Form.js';
import FormGroup from 'react-bootstrap/lib/FormGroup.js';
import FormControl from 'react-bootstrap/lib/FormControl.js';
import HelpBlock from 'react-bootstrap/lib/HelpBlock.js';
import ChoicesList from './choicesList.jsx';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfChoices: 4,
      titleValue: '',
      descValue: '',
      choicesValues: ['', '', '', '']
    };
    this.titleChange = this.titleChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.choiceValueChange = this.choiceValueChange.bind(this);
    this.choiceAddLength = this.choiceAddLength.bind(this);
  }

  titleChange(e) {
    this.setState({
      titleValue: e.target.value
    });
  }

  descChange(e) {
    this.setState({
      descValue: e.target.value
    })
  }

  choiceValueChange(e) {
    let tempArray = this.state.choicesValues.slice();
    let tempIndex = parseInt(e.target.className.split(' ')[0]);
    tempArray[tempIndex] = e.target.value;
    this.setState({
      choicesValues: tempArray
    })
  }

  choiceAddLength() {
    this.setState({
      choicesValues: choicesValues.concat(['', ''])
    });
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup controlId="createNewPoll">

            <FormControl
              type="text"
              value={this.state.titleValue}
              placeholder="Polling question (required)"
              onChange={this.titleChange}
              bsSize="large"
              maxLength="50"
              ></FormControl>
            <HelpBlock>{this.state.titleValue.length}/50</HelpBlock>
            
            <FormControl
              type="text"
              value={this.state.descValue}
              placeholder="More information (optional)"
              onChange={this.descChange}
              maxLength="160"
            ></FormControl>
            <HelpBlock>{this.state.descValue.length}/160</HelpBlock>
            
            <h4>Choices:</h4>
            <ChoicesList
              choicesValues={this.state.choicesValues}
              choiceValueChange={this.choiceValueChange}
              choiceAddLength={this.choiceAddLength}
              />

          </FormGroup>
        </form>
      </div>
    );
  }
}

export default Create;