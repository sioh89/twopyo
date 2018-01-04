import React from 'react';

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    console.log('props from authenticate: ', this.props);
    this.state = {
      component: '<' + this.props.comp + ' {...this.props} />',
    }
  }
  
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      console.log('Not logged in. Redirecting.');
      this.props.history.push('/');
    }
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      console.log('Not logged in. Redirecting.');
      this.props.history.push('/');
    }
  }

  render() {
    return <this.props.comp {...this.props}/>;
  }
}

export default Authenticate