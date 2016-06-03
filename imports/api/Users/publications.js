import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Users } from './collection';
import { Assets } from '../Assets/collection';

Meteor.publish('user', function userPublication(id) {
  check(id, String);

  const user = Users.find({
    _id: id
  });

  const assets = Assets.find({
    userId: id
  });

  return user ? [user, assets] : [];
});
