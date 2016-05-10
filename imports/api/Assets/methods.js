import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Assets } from './collection';

Meteor.methods({
  'assets.insert'(title, description, published = false, adult = false, commentsAllowed = true, tags = [], categoryId, files = []) {
    check(title, String);
    check(description, String);

    check(published, Boolean);
    check(adult, Boolean);
    check(commentsAllowed, Boolean);

    check(categoryId, Match.Maybe(String));

    // check(files, {
    //   path: String
    // });

    // Make sure the user is logged in before inserting a asset
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const assetId = Assets.insert({
      title,
      description,

      files,

      likes: 0,
      views: 0,
      comments: 0,

      published,
      adult,
      commentsAllowed,
      categoryId,
      tags,

      createdAt: new Date(),
      userId: this.userId,
    });

    return assetId;
  },
  'assets.remove'(assetId) {
    check(assetId, String);

    const asset = Assets.findOne(assetId);

    let allowed = false;
    if (asset.userId === this.userId) {
      allowed = true;
    }

    if (!allowed) {
      throw new Meteor.Error('not-authorized');
    }

    Assets.remove(assetId);
  },
  'assets.view'(assetId) {
    check(assetId, String);

    const asset = Assets.findOne(assetId);
    if (asset.public) {
      // If the asset is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    // TODO: add notification

    Assets.update(assetId, {
      $inc: {
        views: 1
      }
    });
  },
  'assets.comment'(assetId, text) {
    check(assetId, String);
    check(text, String);

    const asset = Assets.findOne(assetId);
    if (asset.commentsAllowed) {
      throw new Meteor.Error('not-authorized');
    }

    Meteor.call('comments.insert', assetId, text);

    // TODO: add notification

    //TODO: call this line in comments.insert callback
    Assets.update(assetId, {
      $inc: {
        comments: 1
      }
    });

  },
  'assets.setPublic'(assetId, setToPublic) {
    check(assetId, String);
    check(setToPublic, Boolean);

    const asset = Assets.findOne(assetId);

    let allowed = false;
    if (asset.userId === this.userId) {
      allowed = true;
    }

    if (!allowed) {
      throw new Meteor.Error('not-authorized');
    }

    Assets.update(assetId, {
      $set: {
        published: setToPublic
      }
    });
  },

  'assets.edit'(assetId, modifier) {
    check(assetId, String);

    const asset = Assets.findOne(assetId);

    let allowed = false;
    if (asset.userId === this.userId) {
      allowed = true;
    }

    if (!allowed) {
      throw new Meteor.Error('not-authorized');
    }

    Assets.update(assetId, modifier);
  },
});