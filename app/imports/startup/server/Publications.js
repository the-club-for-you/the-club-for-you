import { Meteor } from 'meteor/meteor';
import { Clubs } from '../../api/club/Clubs';
import { Interests } from '../../api/interest/Interests';
import { Types } from '../../api/types/Types';
import { Token } from '../../api/token/token';
import { Favorites } from '../../api/Favorites/Favorites';
import { Events } from '../../api/event/Events';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.

Meteor.publish(Clubs.userPublicationName, function () {
  return Clubs.collection.find();
});

Meteor.publish(Favorites.userPublicationName, function () {
  return Favorites.collection.find();
});

// for MyClubs
Meteor.publish(Clubs.clubPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Clubs.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Interests.userPublicationName, function () {
  return Interests.collection.find();
});

Meteor.publish(Token.userPublicationName, function () {
  return Token.collection.find();
});

Meteor.publish(Types.userPublicationName, function () {
  return Types.collection.find();
});

Meteor.publish(Events.userPublicationName, function () {
  return Events.collection.find();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
