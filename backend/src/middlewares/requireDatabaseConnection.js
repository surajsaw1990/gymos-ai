import mongoose from 'mongoose';

export default function requireDatabaseConnection(_req, _res, next) {
  if (mongoose.connection.readyState !== 1) {
    const error = new Error('Database is not connected yet. Please try again shortly.');
    error.statusCode = 503;
    next(error);
    return;
  }

  next();
}
