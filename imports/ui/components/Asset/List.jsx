import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Assets as AssetsCollection } from '../../../api/Assets/collection';

import AssetItem from "./Item";

class AssetList extends Component {

  handleRemove(id) {
    Meteor.call('assets.remove', id);
  }

  renderAssets(assets) {
    return assets.map((asset) => {
      const currentUserId = this.context.currentUser && this.context.currentUser._id;
      const showPrivateButton = asset.userId === currentUserId;
      return (
        <AssetItem key={ asset._id } data={ asset } showPrivateButton={ showPrivateButton } />
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

    const {data} = this.props;
    
    return (
      <div className="row">
        { this.renderAssets(data) }
      </div>
      );
  }
}

AssetList.propTypes = {
  loading: React.PropTypes.bool,
  data: PropTypes.array,
};

AssetList.contextTypes = {
  currentUser: React.PropTypes.object,
};

export default createContainer((props) => {
  let {userId} = props;

  if (!userId) {
    return {
      loading: false,
      data: [],
    };
  }

  let subscriptionHandler = Meteor.subscribe('assets', userId);
  let loading = !subscriptionHandler.ready();

  let data = AssetsCollection.find({
    userId
  }).fetch();

  return {
    loading,
    data,
  };
}, AssetList);