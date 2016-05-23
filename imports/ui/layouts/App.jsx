import React from 'react';
import { Meteor } from 'meteor/meteor';

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      showConnectionIssue: false,
    };
    this.logout = this.logout.bind(this);
  }

  getChildContext() {
    return {
      currentUser: this.state.currentUser,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({
        showConnectionIssue: true
      });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  componentWillReceiveProps({user}) {
    if (user !== undefined && user !== this.state.currentUser) {
      // upadte current User state with props from AppContainer
      this.setState({
        currentUser: user
      });
    }
  }

  logout() {
    Meteor.logout();

    // reset currentUser state
    this.setState({
      currentUser: null
    });
  }

  render() {
    const {showConnectionIssue} = this.state;
    const {user, connected, children, location} = this.props;

    const containerStyle = {
      marginTop: "60px"
    };

    return (
      <div>
        <Nav location={location} />
        <div className="container" style={containerStyle}>
          <div className="row">
            <div className="col-lg-12">
              {showConnectionIssue && !connected
               ? <div className="alert alert-danger">
                   <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> No Connection
                 </div>
               : null}
              {children}
            </div>
          </div>
          <Footer/>
        </div>
      </div>
      );
  }
}

App.propTypes = {
  user: React.PropTypes.object,
  connected: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  children: React.PropTypes.element,
  location: React.PropTypes.object,
};

App.contextTypes = {
  router: React.PropTypes.object,
};

App.childContextTypes = {
  currentUser: React.PropTypes.object,
}