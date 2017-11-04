import React from 'react';
import Form from 'react-bootstrap/lib/Form.js';
import FormGroup from 'react-bootstrap/lib/FormGroup.js';
import FormControl from 'react-bootstrap/lib/FormControl.js';
import HelpBlock from 'react-bootstrap/lib/HelpBlock.js';
import ChoicesList from './choicesList.jsx';
import Button from 'react-bootstrap/lib/Button.js';
import $ from 'jquery';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfChoices: 4,
      titleValue: '',
      descValue: '',
      choicesValues: ['', '', '', ''],
      choicesBoolean: false,
      titleBoolean: false
    };
    this.titleChange = this.titleChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.choiceValueChange = this.choiceValueChange.bind(this);
    this.choiceAddLength = this.choiceAddLength.bind(this);
    this.createPoll = this.createPoll.bind(this);
  }

  titleChange(e) {
    let temp = /\S/.test(this.state.titleValue)
    this.setState({
      titleValue: e.target.value,
      titleBoolean: temp
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
    let atLeastOneChoice = true;
    for (let i = 0; i < tempArray.length; i++) {
      let temp = tempArray[i];
      if (!/\S/.test(temp)) {
        atLeastOneChoice = false;
      }
    }
    this.setState({
      choicesValues: tempArray,
      choicesBoolean: atLeastOneChoice
    })
  }

  choiceAddLength() {
    this.setState({
      choicesValues: choicesValues.concat(['', ''])
    });
  }

  createPoll(e) {
    e.preventDefault();
    let postObject = {};
    postObject.owner = 'admin';
    postObject.pollTitle = this.state.titleValue;
    postObject.pollDesc = this.state.descValue;
    postObject.choices = this.state.choicesValues;

    $.ajax({
      url: 'http://localhost:3000/polls',
      type: 'POST',
      data: postObject,
      success: (data) => {
        console.log('success!', data);
        this.props.goToIndex();
      }
    });
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup controlId="createNewPoll" onSubmit={this.createPoll}>

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
          <Button type="submit" onClick={this.createPoll} disabled={!this.state.titleBoolean || !this.state.choicesBoolean}>
            Create
          </Button>
        </form>
      </div>
    );
  }
}

export default Create;