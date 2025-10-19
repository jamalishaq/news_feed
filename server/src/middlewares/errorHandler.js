import logEvents from "../utils/logEvents.js";

const errorHandler = (err, req, res, next) => {
  logEvents(
    "errLog.txt",
    `statusCode: ${err.statusCode} | message: ${err.message} | details: ${err.details}`
  );
  const statusCode = err.statusCode;
  const errorResponse = {
    status: "error",
    statusCode,
    error: {
      message: err.message,
      code: err.code,
      details: err.details,
      timestamp: new Date().toISOString(),
      suggestion: err.suggestion,
    },
    requestId: req.requestId,
  };

  return res.status(statusCode).json(errorResponse);
};

export default errorHandler;
