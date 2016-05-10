import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Comments } from './collection';
import { Users } from '../Users/collection';

Meteor.methods({
  'comments.insert'(assetId, text) {
    check(assetId, String);
    check(text, String);
    // check(parentId, Match.Maybe(String));

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Comments.insert({
      assetId,
      text,
      hidden: false, // blocked by admin
      userId: this.userId,
      createdAt: new Date(),
      username: Users.getDisplayName(Users.findOne(this.userId)),
    });
  },

  'comments.remove'(commentId) {
    check(commentId, String);

    const comment = Comments.findOne(commentId);
    if (comment.userId !== this.userId) {
      // make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Comments.remove(commentId);
  },

});