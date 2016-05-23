import React, { PropTypes } from "react";
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import List from "../components/Asset/List";

import Authenticated from "../components/Permission/Authenticated";

class DashboardPage extends React.Component {

  render() {
    const {query} = this.props.location;
    const {params} = this.props;

    const {currentUser} = this.context;

    let userId = null;
    if (currentUser) {
      userId = currentUser._id;
    }

    return (
      <div>
        <h1>Assets</h1>
        <Authenticated>
          <a href="/asset/new">New Asset</a>
        </Authenticated>
        <List userId={ userId } />
      </div>
      );
  }
}

DashboardPage.contextTypes = {
  currentUser: React.PropTypes.object,
}

export default createContainer(() => {
  let subscriptionHandler = Meteor.subscribe('assets');

  let loading = !subscriptionHandler.ready();

  return {
    loading
  };
}, DashboardPage);