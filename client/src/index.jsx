import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import PollList from './components/pollList.jsx';
import Create from './components/create.jsx';
import Results from './components/results.jsx';
import Vote from './components/vote.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      currentPage: '/index' ,
      currentResultsData: {}
    };
    this.goToCreatePage = this.goToCreatePage.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.goToResults = this.goToResults.bind(this);
    this.goToVote = this.goToVote.bind(this);
  }

  goToIndex() {
    // this.setState({
    //   currentPage: '/index'
    // });
    $.ajax({
      url: 'http://localhost:3000/polls',
      type: 'GET',
      success: (data) => {
        console.log('****(*&', data);
        this.setState({
          polls: data,
          currentPage: '/index'
        });
      }
    });
  }

  goToCreatePage() {
    this.setState({
      currentPage: '/create'
    });
  }

  goToResults(data) {
    console.log('!!!!!!!!!!',data)
    this.setState({
      currentPage: '/results',
      currentResultsData: data
    });
  }
  
  goToVote() {
    console.log('!!!!VOTE NOW!');
    this.setState({
      currentPage: '/vote'
    })
  }

  componentDidMount() {
    if (this.props.startPage) {
      console.log('c:')
    }
    $.ajax({
      url: 'http://localhost:3000/polls',
      type: 'GET',
      success: (data) => {
        console.log('****(*&', data);
        this.setState({
          polls : data
        });
      }
    });
  }

  render() {
    let currentPage = this.state.currentPage;
    if (currentPage === '/index')  //can't use curly braces here because of something funky with jsx
      return (
        <div>
          <h1 id="title-card">Tally</h1>
          <Button bsStyle="success" bsSize="large" onClick={this.goToCreatePage} block>Create New Poll</Button>
          <Button bsStyle="success" bsSize="large" onClick={this.goToVote} block>Vote!</Button>
          <PollList polls={this.state.polls} goToResults={this.goToResults}/>
        </div>
      );

    if (currentPage === '/create')
      return (
        <div>
          <h1 id="title-card">Tally</h1>
          <h3>Create a poll!</h3>
          <Create goToIndex={this.goToIndex}/>
        </div>
      );

    if (currentPage === '/results')
      return (
        <div>
          <h1 id="title-card">Tally</h1>
          <h3>Results</h3>
          <Results resultsData={this.state.currentResultsData}/>
        </div>
      );

    if (currentPage === '/vote')
      return (
        <div>
          <h1 id="title-card">Tally</h1>
          <h3>Vote!</h3>
          <Vote/>
        </div>
      );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));