import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Activities } from './collection';

Meteor.methods({
  'activities.insert'(assetId, data, sticky = false) {
    check(assetId, String);
    check(data, Object);
    check(sticky, Boolean);

    // Make sure the user is logged in before inserting a activity
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Activities.insert({
      assetId,
      data,
      sticky,
      userId: this.userId,
      createdAt: new Date(),
      //username: Meteor.users.findOne(this.userId).username,
      username: this.userId,
    });
  },
  'activities.remove'(activityId) {
    check(activityId, String);

    Activities.remove(activityId);
  },
});