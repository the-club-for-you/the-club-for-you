import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const types = [
  'sports',
  'leisure',
  'political',
  'fraternity/sorority',
  'religious',
  'spiritual',
  'academic',
  'professional',
  'service',
  'recreational',
  'honorary society',
  'ethnic',
  'cultural',
];

class ClubsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ClubsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      approve: Date,
      expire: Date,
      type: { type: Array, optional: false },
      'type.$': { type: String, allowedValues: types },
      contact: String,
      email: String,
      description: String,
      photo: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Clubs = new ClubsCollection();
