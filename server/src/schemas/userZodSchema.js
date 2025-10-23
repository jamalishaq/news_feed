import { z } from "zod";
import { generateRawSchema, } from "zod-to-mongoose";

const UserZodSchema = z.object({
    username: z.string(),
    password: z.string().min(8, {message: "Password must be at least 8 characers"})
});

const UserMongooseSchema = generateRawSchema({
    schema: UserZodSchema,
    name: "User"
});

export default UserMongooseSchema;