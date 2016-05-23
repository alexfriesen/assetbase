import React from 'react';

export default class Authenticated extends React.Component {

  render() {
    const {currentUser} = this.context;
    const authenticated = (typeof currentUser === 'object' && currentUser !== null) ? true: false;

    return authenticated ? this.props.children : null;
  }
}

Authenticated.propTypes = {
  children: React.PropTypes.element
};

Authenticated.contextTypes = {
  currentUser: React.PropTypes.object,
};