import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import CommentList from '../components/Comment/List';

import { Comments as CommentsCollection } from '../../api/Comments/collection';

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
  };
}, CommentList);