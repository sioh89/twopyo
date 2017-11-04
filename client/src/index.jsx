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
      currentPage: '/index'
    };
    this.goToCreatePage = this.goToCreatePage.bind(this);
  }

  goToCreatePage() {
    console.log('***should change page to create!');
    this.setState({
      currentPage: '/create'
    });
    // $.ajax({
    //   url: 'http://localhost:3000/polls',
    //   type: 'POST',
    //   data: {
    //     owner: 'testOwner',
    //     pollTitle: 'Test poll',
    //     pollDesc: 'This is a test post',
    //     choices: ['Choice A', 'Choice B', 'Choice C', 'Choice D']
    //   },
    //   success: (data) => {
    //     console.log('success!');
    //   }
    // })
  }

  componentDidMount() {
    console.log('mounted! c:');
    $.ajax({
      url: 'http://localhost:3000/polls',
      type: 'GET',
      success: (data) => {
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
          <PollList polls={this.state.polls} />
        </div>
      );

    if (currentPage === '/create')
      return (
        <div>
          <h1 id="title-card">Index page!</h1>
          <Create/>
        </div>
      );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));