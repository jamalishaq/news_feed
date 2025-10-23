import mongoose from 'mongoose';
import PostMongooseSchema from '../../schemas/postZodSchema.js';


const PostSchema = mongoose.Schema(
  {
    ...PostMongooseSchema,  
    // Mongoose-specific fields
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }, 
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;