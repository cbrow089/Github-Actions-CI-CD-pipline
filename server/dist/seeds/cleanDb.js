import models from '../models/index.js';
import db from '../config/connection.js';
export default async (modelName, collectionName) => {
    try {
        // Check if the model exists
        if (models[modelName]) {
            // Log available models and the requested model name for debugging
            console.log('Available models:', models);
            console.log('Model name:', modelName);
            // Proceed to check for the collection
            let modelExists = await models[modelName].db.db.listCollections({
                name: collectionName
            }).toArray();
            if (modelExists.length) {
                await db.dropCollection(collectionName);
            }
        }
        else {
            // Log an error message if the model does not exist
            console.error(`Model "${modelName}" does not exist.`);
        }
    }
    catch (err) {
        throw err; // Rethrow the error for further handling
    }
};
