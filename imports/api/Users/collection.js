import { Meteor } from 'meteor/meteor';

export const Users = Meteor.users;

Users.isAdmin = function (user) {
  try {
    return !!user && !!user.isAdmin;
  } catch (e) {
    return false; // user not logged in
  }
};

Users.getUserName = function(user) {
  try {
    if (user.username)
      return user.username;
    // if (user && user.services && user.services.twitter && user.services.twitter.screenName)
    //   return user.services.twitter.screenName;

    return "user";
  } catch ( error ) {
    return "user";
  }
};

Users.getDisplayName = function(user) {
    return (user.profile && user.profile.displayName) ? user.profile.displayName : Users.getUserName(user);
};

Users.getEmail = function(user) {
  if (user.profile && user.profile.email) {
    return user.profile.email;
  } else {
    return null;
  }
};

Users.getProfileUrl = function(user, isAbsolute) {
  return "/user/" + user._id;
// if (typeof user === "undefined") {
//   return "";
// }
// isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
// var prefix = isAbsolute ? Telescope.utils.getSiteUrl().slice(0,-1) : "";
// if (user.profile && user.profile.slug) {
//   return prefix + FlowRouter.path("users.single", {slug: user.profile.slug});
// } else {
//   return "";
// }
};

Users.getAvatarUrl = function(user) {
  return "http://lorempixel.com/50/50/?t=" + user._id;
};