import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import AssetItem from "./Item";

export default class AssetList extends Component {

  handleRemove(id) {
    Meteor.call('assets.remove', id);
  }

  renderAssets(assets) {
    return assets.map((asset) => {
      const currentUserId = this.context.currentUser && this.context.currentUser._id;
      const showPrivateButton = asset.userId === currentUserId;
      return (
        <AssetItem key={ asset._id } asset={ asset } showPrivateButton={ showPrivateButton } />
        );
    });
  }

  render() {
    const {loading} = this.props;

    if (loading) {
      return (
        <h1>loading...</h1>
        );
    }

    const {assets} = this.props;
    
    return (
      <div className="row">
        { this.renderAssets(assets) }
      </div>
      );
  }
}

AssetList.propTypes = {
  loading: React.PropTypes.bool,
  assets: PropTypes.array,
};

AssetList.contextTypes = {
  currentUser: React.PropTypes.object,
};

