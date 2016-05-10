import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Users } from './collection';

Meteor.methods({

  'users.edit': function(userId, modifier) {
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if(Meteor.user()._id !== userId) {
      throw new Meteor.Error('not-authorized');
    }

    Users.update(userId, modifier);
  },

});