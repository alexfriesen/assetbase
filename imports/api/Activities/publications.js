import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Activities } from './collection';

Meteor.publish('activities', function activitiesPublication() {
  return Activities.find({
    $or: [
      {
        private: {
          $ne: true
        }
      },
      {
        userId: this.userId
      },
    ],
  });
});

Meteor.publish('assetActivities', function assetActivitiesPublication(assetId) {
  return Activities.find({
    assetId
  });
});

Meteor.publish('activity', function activityPublication(activityId) {
  check(activityId, String);
  
  return Activities.find({
    _id: activityId
  });
});
