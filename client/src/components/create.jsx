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
      finalChoices: [],
      choicesBoolean: false,
      titleBoolean: false,
      addChoicesBoolean: true,
    };
    this.titleChange = this.titleChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.choiceValueChange = this.choiceValueChange.bind(this);
    this.choiceAddLength = this.choiceAddLength.bind(this);
    this.createPoll = this.createPoll.bind(this);
    this.addChoices = this.addChoices.bind(this);
    // this.formatFinalChoices = this.formatFinalChoices.bind(this);
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
    let tempIndex = parseInt(e.target.id.split('-')[1]);
    tempArray[tempIndex] = e.target.value;
    let numChoices = 0;
    let choicesArr = [];
    for (let i = 0; i < tempArray.length; i++) {
      let temp = tempArray[i];
      if (temp.trim() !== "") {
        numChoices++;
        choicesArr.push(temp);
      }
    }
    this.setState({
      choicesValues: tempArray,
      choicesBoolean: !(numChoices < 2),
      finalChoices: choicesArr,
    });
  }

  choiceAddLength() {
    this.setState({
      choicesValues: choicesValues.concat(['', ''])
    });
  }

  addChoices() {
    this.setState({
      choicesValues: this.state.choicesValues.concat(['', '', '', '', '', '']),
      addChoicesBoolean: false,
    })
  }

  // formatFinalChoices() {
  //   let choices = [];
  //   for (let i = 0; i < this.state.choicesValues.length; i++) {
  //     if (this.state.choicesValues[i].trim() !== "") {
  //       choices.push(this.state.choicesValues[i]);
  //     }
  //   }
  //   this.setState({
  //     finalChoices: choices,
  //   });
  // }

  createPoll(e) {
    e.preventDefault();

    console.log('---finalChoices: ', this.state.finalChoices);
    let postObject = {};
    postObject.owner = 'admin';
    postObject.pollTitle = this.state.titleValue;
    postObject.pollDesc = this.state.descValue;
    postObject.choices = this.state.finalChoices;

    $.ajax({
      url: 'http://localhost:3000/polls',
      type: 'POST',
      data: postObject,
      success: (data) => {
        console.log('success!', data);
        console.log('input data', postObject);

//***************** */

      }
    });
  }

  render() {
    return (
      <div className="create-component">
        <div className="card main-create-card">

          <form  onSubmit={this.createPoll}>
            <div className="form-group">

              <div className="create-banner">
                <p className="create-banner-text">Create a new poll</p>
              </div>

              <div className="create-form">

                <div className="row">
                  <div className="col-sm-3 col-form-label create-label">
                    <label for="inputTitle" className="">
                      Poll title
                    </label>
                  </div>
                  <div className="col-sm-9  create-form-control">
                    <input
                      className="form-control"
                      id="inputTitle"
                      aria-describedby="titleHelpBlock"
                      type="text"
                      value={this.state.titleValue}
                      placeholder="Polling question (required)"
                      onChange={this.titleChange}
                      bsSize="large"
                      maxLength="50"
                      ></input>
                    <small id="titleHelpBlock" className="form-text text-muted">{this.state.titleValue.length}/50</small>
                  </div>

                </div>

                <hr/>

                <div className="row">

                  <div className="col-sm-3 col-form-label create-label">
                    <label for="inputDesc">
                      Description
                    </label>
                  </div>
                  <div className="col-sm-9 create-form-control">

                    <input
                      className="form-control"
                      id="inputDesc"
                      aria-describedby="descHelpBlock"
                      type="text"
                      value={this.state.descValue}
                      placeholder="More information (optional)"
                      onChange={this.descChange}
                      maxLength="160"
                    ></input>
                    <small id="descHelpBlock" className="form-text text-muted">{this.state.descValue.length}/160</small>
                  </div>

                </div>

                <hr/>

                <fieldset>
                  <div className="row">

                    <div className="col-form-label col-sm-3 create-label">
                      <label>Choices</label>
                      <small id="choicesHelpBlock" className="form-text text-muted">Please input at least two choices</small>
                    </div>

                    <div className="col-sm-9 create-form-control">

                      {this.state.choicesValues.map((choice, index) => 
                        (
                          <div key={`div${index}`} className="choice-item">
                            <input
                              key={index}
                              className="form-control"
                              aria-describedby
                              type="text"
                              name="choicesBlock"
                              id={'choice-'+index}
                              value={choice}
                              onChange={this.choiceValueChange}
                              maxLength="160"
                            />
                            <small id={`option${index}HelpBlock`} className="form-text text-muted">{choice.length}/50</small>
                          </div>
                        )
                      )}


                      {this.state.addChoicesBoolean ? 
                        (
                          <div className="add-choices">
                            <button type="button" className="btn btn-outline-primary btn-sm add-choices-btn" onClick={this.addChoices}>Add more choices</button>
                          </div>
                        ) : null
                      }

                    </div>

                  </div>
                </fieldset>

                <button type="submit" className="btn btn-success btn-lg btn-block create-btn" onClick={this.createPoll} disabled={!this.state.titleBoolean || !this.state.choicesBoolean}>
                  Create
                </button>

              </div>
            </div>

          </form>

        </div>
      </div>
    );
  }
}

export default Create;