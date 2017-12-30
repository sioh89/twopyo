import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import $ from 'jquery';
import PollList from './components/pollList.jsx';
import Create from './components/create.jsx';
import Results from './components/results.jsx';
import Vote from './components/vote.jsx';
import Home from './components/home.jsx';
import './styles.css';


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
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
              <Link to="/home" className="navbar-brand"><h1>Poll Call</h1></Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li className="nav-item">
                    <Link to="/home" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create" className="nav-link">Create</Link>
                  </li>
                </ul>

                <ul className="nav navbar-nav navbar-right ml-md-auto">
                  <li className="nav-item form-inline">
                    <Link to="/" className="nav-link">Logout</Link>
                  </li>
                </ul>
              </div>
            </nav>
            
            <Switch>
              <Route exact path="/home" component={Home}/>
              <Route path="/create" component={Create}/>
              <Route path="/results/:id" component={Results}/>
              <Route path="/:id" component={Vote}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));