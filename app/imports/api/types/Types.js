import { Mongo } from 'meteor/mongo';

class TypesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'TypesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.list = [
      'Academic',
      'Cultural',
      'Ethnic',
      'Fraternity or Sorority',
      'Honorary Society',
      'Leisure',
      'Political',
      'Professional',
      'Recreational',
      'Religious',
      'Service',
      'Spiritual',
      'Sports',
    ];
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Types = new TypesCollection();
