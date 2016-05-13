import md5 from 'md5';
import { Slingshot } from 'meteor/edgee:slingshot';

Slingshot.createDirective("assets", Slingshot.S3Storage, {
  acl: "public-read",

  authorize: function() {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function(file) {
    //Store file into a directory by the user's username.
    //var user = Meteor.users.findOne(this.userId);
    return 'assets/' + this.userId + '/' + md5(new Date().getTime()) + '.' + getFileExtension(file.name);
  }
});


Slingshot.createDirective("profile", Slingshot.S3Storage, {
  acl: "public-read",

  authorize: function() {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function(file) {
    //Store file into a directory by the user's username.
    //var user = Meteor.users.findOne(this.userId);
    return 'profile/' + this.userId + '/' + file.name;
  }
});

function getFileExtension(filename) {
  return filename.substr(filename.lastIndexOf('.') + 1);
}