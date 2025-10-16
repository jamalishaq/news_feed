import { z } from "zod";
import { generateRawSchema, } from "zod-to-mongoose";

export const PostZodSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Post content cannot be empty." })
    .max(500, { message: "Post content cannot exceed 500 characters." }),
  title: z
    .string()
    .min(1, { message: "Title cannot be empty." })
    .max(100, { message: "Title cannot exceed 100 characters." }),

  //     // Optional image URL, must be a valid URL if provided
  //   imageUrl: z.string().url({ message: "Must be a valid URL format." }).optional().nullable(),

  //   // Array of topics/tags
  //   tags: z.array(
  //     z.string().min(1).max(20)
  //   ).optional(),

  // Number of likes (default to 0 in Mongoose schema)
  likesCount: z.number().int().min(0).optional(),

  // Array of user IDs who liked the post (optional for input)
  likes: z.array(z.string()).optional(),
});

const PostMongooseSchema = generateRawSchema({
  schema: PostZodSchema,
  name: "Post",
});

export default PostMongooseSchema;
