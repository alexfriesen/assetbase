import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class AssetFile extends Component {

  render() {
    const {path, filename} = this.props.file;

    return (
      <div className="col-sm-12">
        <img src={ path } alt={ filename || "" } className="img-responsive center-block" />
      </div>
      );
  }
}

AssetFile.propTypes = {
  asset: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired,
};