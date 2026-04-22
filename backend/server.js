import mongoose from 'mongoose';
import app from './src/app.js';
import connectDatabase from './src/config/db.js';
import { env } from './src/config/env.js';

let server;

async function startServer() {
  try {
    server = app.listen(env.port, () => {
      console.log(`${env.appName} backend running on port ${env.port}`);
    });

    await connectDatabase();
  } catch (error) {
    console.error('Failed to start backend:', error.message);
    process.exit(1);
  }
}

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down ${env.appName} backend...`);

  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }

  process.exit(0);
}

process.on('SIGINT', () => {
  shutdown('SIGINT').catch((error) => {
    console.error('Shutdown error:', error.message);
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM').catch((error) => {
    console.error('Shutdown error:', error.message);
    process.exit(1);
  });
});

startServer();
