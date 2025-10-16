import connectDB from './connection.js';
import Post from './models/Post.js';

/**
 * Initializes the database connection and exports models.
 */
const db = {
    // Function to start the connection
    connect: connectDB,
    
    // Export all Mongoose Models
    models: {
        Post,
    }
};

export default db;
