import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Users } from './collection';

Meteor.publish('user', function userPublication(id) {
  check(id, String);
  const user = Users.find({
    _id: id
  });
  return user || [];
});
