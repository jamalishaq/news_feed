import express from "express";
import cors from "cors";
import v1Router from "./routes/v1/router.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // headers you expect from the client
  credentials: true, // if you need cookies or auth headers
};


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(logger);

app.use("/api/v1", v1Router);

app.use(errorHandler);

export default app;