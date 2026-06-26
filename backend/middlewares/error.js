class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  console.error("Error caught by middleware:", err);
  let error = err;

  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  if (error.code === 11000) {
    const keys = error.keyValue ? Object.keys(error.keyValue).join(", ") : "field";
    error = new ErrorHandler(`Duplicate ${keys} Entered`, 400);
  }
  if (error.name === "JsonWebTokenError") {
    error = new ErrorHandler("Json Web Token is invalid, Try again!", 400);
  }
  if (error.name === "TokenExpiredError") {
    error = new ErrorHandler("Json Web Token is expired, Try again!", 400);
  }
  if (error.name === "CastError") {
    error = new ErrorHandler(`Invalid ${error.path}`, 400);
  }
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((e) => e.message)
      .join(" ");
    error = new ErrorHandler(message, 400);
  }

  const errorMessage = error.errors
    ? Object.values(error.errors)
        .map((e) => e.message)
        .join(" ")
    : error.message;

  return res.status(error.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
