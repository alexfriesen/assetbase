import React, { PropTypes } from "react";
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import List from "../components/Asset/List";

class DashboardPage extends React.Component {

  render() {
    const {query} = this.props.location;
    const {params} = this.props;

    const {currentUser} = this.props;

    let userId = null;
    if (currentUser) {
      userId = currentUser._id;
    }

    return (
      <div>
        <h1>Assets</h1>
        <a href="/asset/new">New Asset</a>
        <List userId={ userId } currentUser={ this.props.currentUser } />
      </div>
      );
  }
}

DashboardPage.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('assets');

  return {
    currentUser: Meteor.user(),
  };
}, DashboardPage);