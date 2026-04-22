import mongoose from 'mongoose';
import { env } from '../config/env.js';

const databaseStateMap = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

export function getHealth(_req, res) {
  const databaseState = mongoose.connection.readyState;

  res.status(200).json({
    success: true,
    data: {
      appName: env.appName,
      status: 'ok',
      environment: env.nodeEnv,
      timestamp: new Date().toISOString(),
      uptime: Number(process.uptime().toFixed(2)),
      databaseState,
      databaseStatus: databaseStateMap[databaseState] || 'unknown',
    },
  });
}
