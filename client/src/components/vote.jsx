import React from 'react';
import Form from 'react-bootstrap/lib/Form.js';
import FormGroup from 'react-bootstrap/lib/FormGroup.js';
import FormControl from 'react-bootstrap/lib/FormControl.js';
import Button from 'react-bootstrap/lib/Button.js';
import Radio from 'react-bootstrap/lib/Radio.js';
import $ from 'jquery';


class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPoll: '',
      currentTextValue: '',
      currentSelection: -1
    };
    this.currentTextChange = this.currentTextChange.bind(this);
    this.getPoll = this.getPoll.bind(this);
    this.selectRadio = this.selectRadio.bind(this);
    this.castVote = this.castVote.bind(this);
  }


  currentTextChange(e) {
    this.setState({
      currentTextValue: e.target.value
    })
  }

  getPoll(e) {
    e.preventDefault();
    let tempUrl = 'http://localhost:3000/' + this.state.currentTextValue;
    $.ajax({
      url: tempUrl,
      type: 'GET',
      success: (data) => {
        console.log('success!', data);
        this.setState({
          currentPoll: data
        });
      }
    })

  }

  selectRadio(e) {
    let choiceNumber = document.querySelector('input[name = "choices"]:checked').value;    
    this.setState({
      currentSelection: choiceNumber
    });
  }

  castVote(e) {
    e.preventDefault();

    let choiceTextValue = document.querySelector('input[name = "choices"]:checked').value;
    console.log('***', choiceTextValue);
    let tempUrl = 'http://localhost:3000/castVote';
    $.ajax({
      url: tempUrl,
      type: 'POST',
      data: {
        pollId: this.state.currentPoll.pollId,
        choiceNumber: choiceTextValue
      },
      success: (data) => {
        console.log('success!', data);
        let fetchUrl = 'http://localhost:3000/results/' + this.state.currentPoll.pollId;
        $.ajax({
          url: fetchUrl,
          type: 'GET',
          success: (data) => {
            this.props.goToResults(data);
          }
        })
      }
    })
  }

  render() {
    if (this.state.currentPoll === '')
      return (
        <div>
          <form>
            <FormGroup controlId="getPoll" onSubmit={this.getPoll}>
              <FormControl
                type="text"
                value={this.state.currentTextValue}
                placeholder="Poll number"
                onChange={this.currentTextChange}
                bsSize="large"
                maxLength="5"
              ></FormControl>
            </FormGroup>
            <Button type="submit" onClick={this.getPoll} disabled={!this.state.currentTextValue}>
            Get poll</Button>
          </form>
        </div>
      );
  
    return (
      <div>
        <h3>{this.state.currentPoll.pollTitle}</h3>
        <h4>{this.state.currentPoll.pollDesc}</h4>
        <form>
          {this.state.currentPoll.choices.map((choice, index) => 
            <Radio name="choices" onClick={this.selectRadio} key={index} index={index} value={choice.id}>{choice.text}</Radio>
          )}
          <Button
            type="submit"
            onClick={this.castVote}
            disabled={this.state.currentSelection===-1}>Cast my vote!</Button>
        </form>
      </div>
    );
  }
}

export default Vote;