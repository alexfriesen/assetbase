import React from 'react';
import { Meteor } from 'meteor/meteor';

import UserName from './Name';
import UserAvatar from './Avatar';

export default class EditUser extends React.Component {

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const displayName = String(this.refs.displayName.value).trim();
    const summary = String(this.refs.summary.value).trim();

    // TODO: move to reducers
    Meteor.call('users.edit', this.props.user._id, {
      $set: {
        profile: {
          displayName,
          summary
        }
      }
    });
  }

  render() {
    const {user} = this.props;
    const {profile} = user || {};
    const {displayName, email, summary} = profile || {};

    return (
      <form className="form-horizontal" onSubmit={ this.handleSubmit.bind(this) }>
        <fieldset>
          <div className="row">
            <div className="col-lg-6">
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={ displayName || "" }
                  ref="displayName"
                  placeholder="Display Name" />
              </div>
            </div>
            <div className="col-lg-12">
              <textarea
                className="form-control"
                defaultValue={ summary || "" }
                ref="summary"
                placeholder="Profile summary" />
            </div>
            <div className="col-lg-12">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </fieldset>
      </form>
      );
  }
}

EditUser.propTypes = {
  user: React.PropTypes.object,
};

EditUser.contextTypes = {
  currentUser: React.PropTypes.object,
};