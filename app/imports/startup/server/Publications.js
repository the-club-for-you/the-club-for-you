import { Meteor } from 'meteor/meteor';
import { Clubs } from '../../api/club/Clubs';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Clubs.userPublicationName, function () {
  return Clubs.collection.find();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
