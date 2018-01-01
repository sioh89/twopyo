import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Navbar from './navbar.jsx';

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

    axios.post('/polls', postObject)
      .then((res) => {
        console.log('success!', res);
        console.log('input data', postObject);
        this.setState({
          created: res.data,
        });
        this.removeModal();
      })
  }

  render() {
    if (this.state.created !== '') {
      return <Redirect to={`/results/${this.state.created}`} />;
    }

    return (
      <div className="create-component">
        <Navbar {...this.props}/>
        <div className="card main-create-card">

          <form  onSubmit={this.createPoll}>
            <div className="form-group">

              <div className="blue-banner">
                <p className="blue-banner-text">Create a new poll</p>
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
                        <div className="card pending-create-card">
                          <div className="card-body">
                            <h1 className="card-title">{this.state.titleValue}</h1>
                            <h6 className="card-subtitle mb-2 text-muted">{this.state.descValue}</h6>
                            <div className="list-group pending-create-choices">
                              {this.state.finalChoices.map((choice, index) => 
                                (<p key={`pc-${index}`} className="list-group-item card-text">{choice}</p>)
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary btn-light-text" onClick={this.createPoll}>Looks good!</button>
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