import { Mongo } from 'meteor/mongo';
import { Clubs } from './Clubs';

class ClubsOwnedCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ClubsOwnedCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = Clubs.schema;
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const ClubsOwned = new ClubsOwnedCollection();
