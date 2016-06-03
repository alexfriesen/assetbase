import React from "react";
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer, ReactMeteorData } from 'meteor/react-meteor-data';

import { Users as UsersCollection } from '../../api/Users/collection';
import { Assets as AssetsCollection } from '../../api/Assets/collection';

import Profile from "../components/Users/Profile";
import UserEdit from "../components/Users/Edit";
import AssetList from "../components/Asset/List";

class UserPage extends React.Component {

  render() {
    const {loading, userExists} = this.props;

    if (loading) {
      return (
        <h1>loading...</h1>
        );
    }

    if (!userExists) {
      return (
        <h1>404</h1>
        );
    }

    const {currentUser} = this.context;
    const {user, assets} = this.props;
    const {profile} = user;

    const isCurrentUser = currentUser && currentUser._id === user._id;

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
        <UserEdit user={user} />
        );
    }

    return (
      <div>
        <Profile user={user} />
        <h3>Assets</h3>
        <AssetList assets={assets} />
      </div>
      );
  }
}

UserPage.propTypes = {
  loading: React.PropTypes.bool,
  userExists: React.PropTypes.bool,
  user: React.PropTypes.object,
  assets: React.PropTypes.object,
};

UserPage.contextTypes = {
  currentUser: React.PropTypes.object,
}

export default createContainer((props) => {
  let {query} = props.location;
  let {id} = props.params;

  let subscriptionHandler = Meteor.subscribe('user', id);
  const user = UsersCollection.findOne(id);
  const assets = AssetsCollection.find({userId: id});

  let loading = !subscriptionHandler.ready();
  let userExists = !loading && !!user;

  return {
    loading,
    userExists,
    user,
    assets
  };
}, UserPage);