import { z } from "zod";
import { generateRawSchema, } from "zod-to-mongoose";

export const PostZodSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Post content cannot be empty." })
    .max(500, { message: "Post content cannot exceed 500 characters." }),
});

const PostMongooseSchema = generateRawSchema({
  schema: PostZodSchema,
  name: "Post",
});

export default PostMongooseSchema;
