import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class AssetFile extends React.Component {

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
  asset: React.PropTypes.object.isRequired,
  file: React.PropTypes.object.isRequired,
};