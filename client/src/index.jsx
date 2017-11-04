import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import PollList from './components/pollList.jsx';
import Create from './components/create.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      currentPage: '/index',
      currentResultsData: {}
    };
    this.goToCreatePage = this.goToCreatePage.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.goToResults = this.goToResults.bind(this);
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
    // this.setState({
    //   currentPage: '/results',
    //   currentResultsData: data
    // });
  }

  componentDidMount() {
    console.log('mounted! c:');
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
          <h1 id="title-card">Tally Rally</h1>
          <Button bsStyle="success" bsSize="large" onClick={this.goToCreatePage} block>Create New Poll</Button>
          <PollList polls={this.state.polls} goToResults={this.goToResults}/>
        </div>
      );

    if (currentPage === '/create')
      return (
        <div>
          <h1 id="title-card">Index page!</h1>
          <Create goToIndex={this.goToIndex}/>
        </div>
      );

    if (currentPage === '/polling')
      return (
        <div>
          
        </div>
      );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));