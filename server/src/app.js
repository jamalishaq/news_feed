import express from "express";
import cors from "cors";
import v1Router from "./routes/v1/router.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";

const app = express();

app.use(cors())
app.use(express.json());
app.use(logger);

app.use("/api/v1", v1Router);

app.use(errorHandler);

export default app;