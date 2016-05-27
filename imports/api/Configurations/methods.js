import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Users } from '../Users/collection';
import { Configurations } from './collection';

Meteor.methods({

  'configurations.insert'(data) {
    check(data, Object);

    // Make sure the user is logged in before inserting a configuration
    if (!Users.isAdmin(Meteor.user())) {
      throw new Meteor.Error('not-authorized');
    }

    // force to be inactive
    data.active = false;

    Configurations.insert({
      data,
      userId: this.userId,
      createdAt: new Date(),
    });
  },

  'configurations.activate'(configurationId) {
    check(configurationId, String);

    if (!Users.isAdmin(Meteor.user())) {
      throw new Meteor.Error('not-authorized');
    }

    // deactivate all configurations
    Configurations.update({
      '_id': {
        $ne: configurationId
      }
    }, {
      $set: {
        active: false
      }
    });

    // activate configuration
    Configurations.update(configurationId, {
      $set: {
        active: true
      }
    });
  },

  'configurations.remove'(configurationId) {
    check(configurationId, String);

    if (!Users.isAdmin(Meteor.user())) {
      throw new Meteor.Error('not-authorized');
    }

    Configurations.remove(configurationId);
  },
  
});