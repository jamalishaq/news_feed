import logEvents from "../utils/logEvents.js";

const logger = (req, res, next) => {
    logEvents("reqLog.txt", `Method: ${req.method} | URL: ${req.url}`);
    next();
}

export default logger;