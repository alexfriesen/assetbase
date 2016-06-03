import React from "react";
import ReactDOM from 'react-dom';

import Profile from "../components/Users/Profile";
import UserEdit from "../components/Users/Edit";
import AssetList from "../components/Asset/List";

export default class UserPage extends React.Component {

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
        <hr />
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
  assets: React.PropTypes.array,
};

UserPage.contextTypes = {
  currentUser: React.PropTypes.object,
}

