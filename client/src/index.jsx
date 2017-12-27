import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import PollList from './components/pollList.jsx';
import Create from './components/create.jsx';
import Results from './components/results.jsx';
import Vote from './components/vote.jsx';
import Home from './components/home.jsx';

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
    this.setState({
      currentPage: '/results',
      currentResultsData: data
    });
  }
  
  goToVote() {
    this.setState({
      currentPage: '/vote'
    })
  }

  // componentDidMount() {
  //   if (this.props.startPage) {
  //     console.log('c:')
  //   }
  //   $.ajax({
  //     url: 'http://localhost:3000/polls',
  //     type: 'GET',
  //     success: (data) => {
  //       console.log('****(*&', data);
  //       this.setState({
  //         polls : data
  //       });
  //     }
  //   });
  // }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Link to="/"><h1>Poll Call</h1></Link>
            
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/create" component={Create}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));