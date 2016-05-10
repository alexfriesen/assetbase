import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Comments as CommentsCollection } from '../../../api/Comments/collection';

import CommentItem from './Item';

class CommentList extends Component {
  renderComments(data) {
    let filteredData = data;

    // if (this.state.hideStatus) {
    //   filteredData = filteredData.filter(data => !data.checked);
    // }

    if (filteredData.length <= 0) {
      return (
        <span class="text-info">No Comments submitted.</span>
        );
    }

    return filteredData.map((comment) => {
      return (
        <CommentItem key={ comment._id } comment={ comment } currentUser={ this.props.currentUser } />
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
      <div className="well media-list">
        { this.renderComments(data) }
      </div>
      );
  }
}

CommentList.propTypes = {
  loading: React.PropTypes.bool,
  data: PropTypes.array,
  currentUser: PropTypes.object,
};

export default createContainer((props) => {
  let {assetId} = props;
  let subscriptionHandler = Meteor.subscribe('assetComments', assetId);
  let loading = !subscriptionHandler.ready();
  let data = CommentsCollection.find({
    assetId: assetId
  }, {
    sort: {
      createdAt: -1
    }
  }).fetch();

  return {
    loading,
    data,
    currentUser: props.currentUser,
  };
}, CommentList);