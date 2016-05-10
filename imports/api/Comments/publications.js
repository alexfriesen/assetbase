import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Comments } from './collection';
import { Users } from '../Users/collection';

Meteor.publish('comments', function commentsPublication(parentId) {
  check(parentId, String);

  // return Comments.find({
  //   $or: [
  //     { private: { $ne: true } },
  //     { userId: this.userId },
  //   ],
  // });

  const comments = Comments.find({
    parentId
  });
  const users = Users.find({
    _id: {
      $in: _.pluck(comments.fetch(), 'userId')
    }
  });

  return [comments, users];
});

Meteor.publish('assetComments', function assetCommentsPublication(assetId) {
  check(assetId, String);

  const comments = Comments.find({
    assetId
  });
  const users = Users.find({
    _id: {
      $in: _.pluck(comments.fetch(), 'userId')
    }
  });

  return [comments, users];
});

Meteor.publish('comment', function commentPublication(commentId) {
  check(commentId, String);

  const comment = Comments.find({
    _id: commentId
  });
  const users = Users.find({
    _id: {
      $in: _.pluck(comment.fetch(), 'userId')
    }
  });

  return [comment, users];
});
