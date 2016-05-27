import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Configurations } from './collection';

import { Users } from '../Users/collection';

Meteor.publish('cofiguration', function cofigurationPublication() {
  return Configurations.find({
    active: true
  });
});

Meteor.publish('cofigurations.all', function cofigurationsPublication() {
  // Make sure the user is admin
  if (!Users.isAdmin(Meteor.user())) {
    return [];
  }

  // return all configurations
  return Configurations.find();
});
