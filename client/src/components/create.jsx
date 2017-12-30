import React from 'react';
import ChoicesList from './choicesList.jsx';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: '',
      descValue: '',
      choicesValues: ['', '', '', ''],
      finalChoices: [],
      choicesBoolean: false,
      titleBoolean: false,
      addChoicesBoolean: true,
      created: '',
    };
    this.titleChange = this.titleChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.choiceValueChange = this.choiceValueChange.bind(this);
    this.choiceAddLength = this.choiceAddLength.bind(this);
    this.createPoll = this.createPoll.bind(this);
    this.addChoices = this.addChoices.bind(this);
    this.removeModal = this.removeModal.bind(this);
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

  removeModal() {
    $(".modal-backdrop.fade.show").remove();
  }

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
        this.setState({
          created: data,
        });
        this.removeModal();
      }
    });
  }

  render() {
    if (this.state.created !== '') {
      return <Redirect to={`/results/${this.state.created}`} />;
    }

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
                            <button type="button" className="btn btn-outline-primary btn-sm add-choices-btn" onClick={() => {this.removeModal(); this.addChoices()}}><span>Add more choices</span></button>
                          </div>
                        ) : null
                      }

                    </div>

                  </div>
                </fieldset>

                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#creationConfirmation"
                  className="btn btn-success btn-lg btn-block create-btn"
                  disabled={!this.state.titleBoolean || !this.state.choicesBoolean}
                >
                  Create
                </button>

                <div
                  className="modal fade"
                  id="creationConfirmation"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="creationConfirmationTitle"
                  aria-hidden="true"
                >

                  <div className="modal-dialog" role="document">
                    <div className="modal-content">



                      <div className="modal-header">
                        <h5 className="modal-title" id="creationConfirmationTitle">Is this ok?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>

                      <div className="modal-body">
                        <p>{this.state.titleValue}</p>
                        <p>{this.state.descValue}</p>
                        <p>{this.state.finalChoices}</p>
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.createPoll}>Looks good!</button>
                      </div>



                    </div>
                  </div>

                </div>

              </div>
            </div>

          </form>

        </div>
      </div>
    );
  }
}

export default Create;