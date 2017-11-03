import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Button } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      currentPage: '/index'
    };
  }

  goToCreatePage() {
    console.log('clicked!');
  }

  render() {
    let currentPage = this.state.currentPage;
    if (currentPage === '/index')  //can't use curly braces here because of something funky with jsx
      return (
        <div>
          <h1 id="title-card">Index page!</h1>
          <button onClick={this.goToCreatePage}>123</button>
        </div>
      );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));