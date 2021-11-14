import { Mongo } from 'meteor/mongo';

class TypesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'TypesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.list = [
      'academic',
      'cultural',
      'ethnic',
      'fraternity or sorority',
      'honorary society',
      'leisure',
      'political',
      'professional',
      'recreational',
      'religious',
      'service',
      'spiritual',
      'sports',
    ];
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Types = new TypesCollection();
