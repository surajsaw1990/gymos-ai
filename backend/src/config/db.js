import mongoose from 'mongoose';
import { env } from './env.js';

const RETRY_DELAY_MS = 5000;
let listenersRegistered = false;

export default async function connectDatabase() {
  mongoose.set('strictQuery', true);
  mongoose.set('bufferCommands', false);

  if (!listenersRegistered) {
    mongoose.connection.on('connected', () => {
      console.log(`MongoDB connected: ${mongoose.connection.host}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected.');
    });

    mongoose.connection.on('error', (error) => {
      console.error(`MongoDB error: ${error.message}`);
    });

    listenersRegistered = true;
  }

  await attemptConnection();
}

async function attemptConnection() {
  try {
    await mongoose.connect(env.mongodbUri, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.error(
      `MongoDB connection failed: ${error.message}. Retrying in ${RETRY_DELAY_MS / 1000} seconds...`,
    );

    setTimeout(() => {
      attemptConnection().catch(() => {
        // Retries are handled recursively with their own logging.
      });
    }, RETRY_DELAY_MS).unref();
  }
}
