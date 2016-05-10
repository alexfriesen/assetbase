import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class AssetItem extends Component {

  deleteThisFestival() {
    Meteor.call('assets.remove', this.props.data._id);
  }

  togglePrivate() {
    Meteor.call('assets.setPublic', this.props.data._id, !this.props.data.private);
  }

  render() {
    const {title} = this.props.data;
    const id = this.props.data._id;
    return (
      <div className="col-md-4">
        <h4>{ title }</h4>
        <a className="btn btn-default" href={ "/asset/" + id }>More Info</a>
      </div>
      );
  }
}

AssetItem.propTypes = {
  data: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};