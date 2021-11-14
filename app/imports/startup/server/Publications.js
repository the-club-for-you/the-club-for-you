import { Meteor } from 'meteor/meteor';
import { Clubs } from '../../api/club/Clubs';
import { Interests } from '../../api/interest/Interests';
import { Types } from '../../api/types/Types';
import { ClubsOwned } from '../../api/club/ClubsOwned';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Clubs.userPublicationName, function () {
  return Clubs.collection.find();
});

Meteor.publish(ClubsOwned.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return ClubsOwned.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Interests.userPublicationName, function () {
  return Interests.collection.find();
});

Meteor.publish(Types.userPublicationName, function () {
  return Types.collection.find();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
