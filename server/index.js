import app from "./src/app.js";
import db from "./src/db/index.js";
import dotenv from "dotenv"
dotenv.config();

async function startServer() {
    try {
        await db.connect(); 
        
        // Only start the server if the connection succeeds.
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server successfully connected to DB and listening on port 3000");
        });

    } catch (error) {
        // If db.connect() (or Mongoose) throws, log and exit.
        console.error("Failed to start server due to database connection error.");
        process.exit(1); 
    }
}

startServer();