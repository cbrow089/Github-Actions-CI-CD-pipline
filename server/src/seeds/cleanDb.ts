import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    // Ensure the database connection is established
    if (!db.db) {
      console.error('Database connection is not established.');
      return; // Exit early if the connection is not established
    }

    // Check if the model exists
    if (models[modelName]) {
      let modelExists = await db.db.listCollections({
        name: collectionName
      }).toArray();

      if (modelExists.length) {
        await db.db.dropCollection(collectionName);
      }
    } else {
      console.error(`Model "${modelName}" does not exist.`);
    }
  } catch (err) {
    console.error('Error in cleanDb:', err);
    throw err; // Rethrow the error for further handling
  }
};
