import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

import UserName from './Name';
import UserAvatar from './Avatar';

export default class UserProfile extends Component {

  render() {
    const {currentUser} = this.context;
    const {user} = this.props;

    const {profile} = user || {};

    const {summary} = profile || {};

    let editButton = "";
    if (user._id === currentUser._id) {
      editButton = <Link to={'/user/' + user._id + '/edit'} className="btn btn-default pull-right"> Edit Profile
                   </Link>;
    }

    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <UserAvatar user={user} size="large" />
            <h1>User: <UserName user={user} /> {editButton}</h1>
            <p>
              {summary || ""}
            </p>
          </div>
        </div>
      </div>
      );
  }
}

UserProfile.contextTypes = {
  currentUser: React.PropTypes.object,
}
