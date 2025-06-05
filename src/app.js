// src/app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyMiddlewares } from './middlewares/index.js';
import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
console.log("app.js is running");
applyMiddlewares(app);

// Static file serving for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api', routes); // ✅ tek bir ana prefix altında tüm router'ı bağla

export default app;
