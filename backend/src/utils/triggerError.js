export const triggerError = (next, statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  next(error); // Pass the error to next middleware
};