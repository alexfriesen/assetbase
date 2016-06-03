import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import AssetFile from './File';

import CommentForm from '../Comment/Form';
import CommentList from '../Comment/List';

import UserName from '../Users/Name';
import UserAvatar from '../Users/Avatar';

export default class AssetDetail extends Component {

  renderFiles(data) {
    if (!data) {
      return;
    }

    return data.map((file) => {
      if (!file) {
        return;
      }

      return (
        <AssetFile key={file.path} asset={this.props.asset} file={file} />
        );
    });
  }

  render() {
    const {currentUser} = this.context;
    const {asset, user} = this.props;

    let editLink;
    if (currentUser && currentUser._id === asset.userId) {
      editLink = <a href={'/asset/' + asset._id + '/edit'}>Edit</a>;
    }

    return (
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            {this.renderFiles(asset.files)}
          </div>
        </div>
        <div className="col-lg-4">
          <div>
            <UserAvatar user={user} size="medium" /> &nbsp;
            <UserName user={user} />
          </div>
          <h1>Asset: {asset.title}</h1>
          {editLink}
          {asset.commentsAllowed
           ? <div>
               <CommentForm assetId={asset._id} large={true} />
               <CommentList assetId={asset._id} />
             </div>
           : null}
        </div>
      </div>
      );
  }
}

AssetDetail.propTypes = {
  asset: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

AssetDetail.contextTypes = {
  currentUser: React.PropTypes.object,
};