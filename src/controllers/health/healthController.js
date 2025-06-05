// src/controllers/health/healthController.js

import { db } from '../../db/index.js';

export const healthCheck = async (req, res) => {
  try {
    // Basit SELECT sorgusu
    await db.execute('SELECT 1');

    res.status(200).json({
      status: 'ok',
      message: 'API and database are healthy 🚀',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Health check failed:', error);

    res.status(500).json({
      status: 'error',
      message: 'Database connection failed ❌',
      timestamp: new Date().toISOString(),
    });
  }
};
