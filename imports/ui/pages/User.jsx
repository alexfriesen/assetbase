import React from "react";
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer, ReactMeteorData } from 'meteor/react-meteor-data';

import { Users as UsersCollection } from '../../api/Users/collection';

import Profile from "../components/Users/Profile";
import UserEdit from "../components/Users/Edit";
import AssetList from "../components/Asset/List";

class UserPage extends React.Component {

  render() {
    const {loading, dataExists} = this.props;

    if (loading) {
      return (
        <h1>loading...</h1>
        );
    }

    if (!dataExists) {
      return (
        <h1>404</h1>
        );
    }

    const {currentUser} = this.context;
    const {data} = this.props;
    const {profile} = data;

    const isCurrentUser = currentUser && currentUser._id === data._id;

    if (!isCurrentUser && (profile && !profile.public)) {
      return (
        <div className="row">
          <div className="col-lg-12">
            <h1>403</h1>
            <p>
              This Profile is not public.
            </p>
          </div>
        </div>
        );
    }

    if (this.props.params.method === 'edit' && isCurrentUser) {
      return (
        <UserEdit user={data} />
        );
    }

    return (
      <div>
        <Profile user={data} />
        <h3>Assets</h3>
        <AssetList userId={data._id} />
      </div>
      );
  }
}

UserPage.propTypes = {
  loading: React.PropTypes.bool,
  dataExists: React.PropTypes.bool,
  data: React.PropTypes.object,
};

UserPage.contextTypes = {
  currentUser: React.PropTypes.object,
}

export default createContainer((props) => {
  let {query} = props.location;
  let {id} = props.params;

  let subscriptionHandler = Meteor.subscribe('user', id);
  const data = UsersCollection.findOne(id);

  let loading = !subscriptionHandler.ready();
  let dataExists = !loading && !!data;

  return {
    loading,
    dataExists,
    data,
  };
}, UserPage);