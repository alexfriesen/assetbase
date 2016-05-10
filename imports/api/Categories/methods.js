import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Categories } from './collection';

// Meteor.methods({
//   'festivals.insert'(title) {
//     check(title, String);

//     // Make sure the user is logged in before inserting a festival
//     if (! this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }

//     Festivals.insert({
//       title,
//       approved: false,
//       createdAt: new Date(),
//       owner: this.userId,
//       username: Meteor.users.findOne(this.userId).username,
//     });
//   },
//   'festivals.remove'(festivalId) {
//     check(festivalId, String);

//     const festival = Festivals.findOne(festivalId);
//     if (festival.private && festival.owner !== this.userId) {
//       // If the festival is private, make sure only the owner can delete it
//       throw new Meteor.Error('not-authorized');
//     }

//     Festivals.remove(festivalId);
//   },
//   'festivals.setChecked'(festivalId, setChecked) {
//     check(festivalId, String);
//     check(setChecked, Boolean);

//     const festival = Festivals.findOne(festivalId);
//     if (festival.private && festival.owner !== this.userId) {
//       // If the festival is private, make sure only the owner can check it off
//       throw new Meteor.Error('not-authorized');
//     }

//     Festivals.update(festivalId, { $set: { checked: setChecked } });
//   },
//   'festivals.setPrivate'(festivalId, setToPrivate) {
//     check(festivalId, String);
//     check(setToPrivate, Boolean);

//     const festival = Festivals.findOne(festivalId);

//     // Make sure only the festival owner can make a festival private
//     if (festival.owner !== this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }

//     Festivals.update(festivalId, { $set: { private: setToPrivate } });
//   },
// });