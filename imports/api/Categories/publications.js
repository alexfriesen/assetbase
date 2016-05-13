import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Categories } from './collection';

Meteor.publish('categories', function categoriesPublication() {
  return Categories.find({
    $or: [
      {
        private: {
          $ne: true
        }
      },
      {
        owner: this.userId
      },
    ],
  });
});
