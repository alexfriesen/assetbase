import React, { Children } from 'react';
import { Meteor } from 'meteor/meteor';

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: null,
      currentUser: null,
      configuration: null,
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

  componentWillReceiveProps({user, configuration}) {
    if (configuration !== undefined && configuration !== this.state.configuration) {
      // upadte current Configuration state with props from AppContainer
      this.setState({
        configuration
      });
    }

    if (user !== undefined && user !== this.state.currentUser) {
      // FIXME: due to a bug in react's context behaviour, some child elements won't update properly

      // upadte current User state with props from AppContainer
      this.setState({
        currentUser: user
      });
    }
  }

  // shouldComponentUpdate(nextProps,nextState, nextcontext) {
  //   if(nextState.currentUser) {
  //     return true;
  //   }
  //   return false;
  // }

  logout() {
    Meteor.logout();

    // reset currentUser state
    this.setState({
      currentUser: null
    });
  }

  render() {
    window.appcomp = this;

    const {showConnectionIssue} = this.state;
    const {loading, user, connected, children, location} = this.props;

    const containerStyle = {
      marginTop: "60px"
    };

    return (
      <div>
        <Nav location={location} onLogout={this.logout} />
        <div className="container" style={containerStyle}>
          <div className="row">
            <div className="col-lg-12">
              {showConnectionIssue && !connected
               ? <div className="alert alert-danger">
                   <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> No Connection
                 </div>
               : null}
              {Children.only(children)}
            </div>
          </div>
          <Footer/>
        </div>
      </div>
      );
  }
}
;

App.propTypes = {
  user: React.PropTypes.object,
  configuration: React.PropTypes.object,
  connected: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  location: React.PropTypes.object,
  children: React.PropTypes.element,
};

App.contextTypes = {
  router: React.PropTypes.object,
};

App.childContextTypes = {
  currentUser: React.PropTypes.object,
  configuration: React.PropTypes.object,
};