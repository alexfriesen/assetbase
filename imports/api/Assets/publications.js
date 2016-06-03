import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Assets } from './collection';
import { Comments } from '../Comments/collection';
import { Users } from '../Users/collection';

Meteor.publish('assets', function assetsPublication(userId) {
  check(userId, Match.Maybe(String));

  if (this.userId === userId) {
    return Assets.find({
      userId
    });
  }

  return Assets.find({
    published: true
  });
});

Meteor.publish('asset', function assetsPublication(assetId) {
  check(assetId, String);

  const assetData = Assets.findOne(assetId);

  const asset = Assets.find({
    _id: assetId
  });

  const comments = Comments.find({
    assetId
  });

  const user = Users.find({
    _id: assetData.userId
  });

  let userSelector = [];
  const commentsData = comments.fetch();
  for (let comment of commentsData) {
    userSelector.push({
      _id: comment.userId
    });
  }

  if (userSelector.length > 0) {
    const users = Users.find({
      $or: userSelector,
    });
  }

  // return [asset, comments, users];
  return [asset, user, comments];
});
