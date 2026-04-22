import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const appName = process.env.APP_NAME || 'GYMOS AI – Personal Trainer & Workout App';
const port = Number(process.env.PORT) || 5000;
const mongodbUri = process.env.MONGODB_URI || '';

if (!mongodbUri) {
  throw new Error('MONGODB_URI is required. Add it to your .env file.');
}

export const env = {
  appName,
  mongodbUri,
  nodeEnv: process.env.NODE_ENV || 'development',
  port,
};
