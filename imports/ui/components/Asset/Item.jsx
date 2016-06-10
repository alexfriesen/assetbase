import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class AssetItem extends React.Component {

  render() {
    const {title} = this.props.asset;
    const id = this.props.asset._id;
    return (
      <div className="col-md-4">
        <h4>{ title }</h4>
        <a className="btn btn-default" href={ "/asset/" + id }>More Info</a>
      </div>
      );
  }
}

AssetItem.propTypes = {
  asset: React.PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};