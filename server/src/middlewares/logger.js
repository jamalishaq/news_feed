import logEvents from "../utils/logEvents";

const logger = (req, res, next) => {
    logEvents("reqLog.txt", `Method: ${req.method} | URL: ${req.url} | Timestamp: ${new Date().toISOString()}`);
    next();
}

export default logger;