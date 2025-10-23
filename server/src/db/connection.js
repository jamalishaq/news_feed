import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

/**
 * Establishes and manages the MongoDB connection.
 * @returns {void}
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
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