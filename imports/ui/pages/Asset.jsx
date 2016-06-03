import React, { PropTypes } from "react";
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor';
import { createContainer, ReactMeteorData } from 'meteor/react-meteor-data';

import { Assets as AssetsCollection } from '../../api/Assets/collection';
import { Users as UsersCollection } from '../../api/Users/collection';

import AssetEdit from '../components/Asset/Edit';
import AssetDetail from '../components/Asset/Detail';

export default class AssetPage extends React.Component {

  handleRemove() {
    const {data} = this.props;
    Meteor.call('assets.remove', data._id);
  }

  handleEdit() {
    this.props.params.method = 'edit';
    //this.props.history.push('/some/path');
  }

  render() {
    const {loading, dataExists} = this.props;
    const {currentUser} = this.context;

    if (loading) {
      return (
        <h1>loading...</h1>
        );
    }

    if (this.props.params.id === 'new') {
      return (
        <AssetEdit />
        );
    }

    if (!dataExists) {
      return (
        <h1>404</h1>
        );
    }

    const {asset, user} = this.props;

    if (!asset.published && !(currentUser && currentUser._id === asset.userId)) {
      return (
        <div className="row">
          <div className="col-lg-12">
            <h1>403</h1>
            <p>
              You are allowed to see this Asset!
            </p>
          </div>
        </div>
        );
    }

    if (this.props.params.method === 'edit') {
      return (
        <AssetEdit asset={asset} />
        );
    }

    return (
      <AssetDetail asset={asset} user={user} />
      );
  }
}

AssetPage.propTypes = {
  loading: React.PropTypes.bool,
  dataExists: React.PropTypes.bool,
  asset: PropTypes.object,
  user: PropTypes.object,
};

AssetPage.contextTypes = {
  currentUser: React.PropTypes.object,
}
