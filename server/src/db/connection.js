import mongoose from 'mongoose';

const DB_URI = "mongodb+srv://jamal_node:jamal_toyin@mernapp.en03loo.mongodb.net/news_feed?retryWrites=true&w=majority&appName=MERNap";

/**
 * Establishes and manages the MongoDB connection.
 * @returns {void}
 */
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI, {
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000, 
        });

        console.log(`MongoDB connected successfully to ${mongoose.connection.host}`);

        // Listen for connection errors after initial connection
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB runtime error:', err);
        });

    } catch (error) {
        console.error('MongoDB connection FAILED:', error.message);
        throw error; // Rethrow to let the caller handle it
    }
};

export default connectDB;