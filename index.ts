import "reflect-metadata";
import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import routes from './src/config/routes.config';
import { errorHandler } from './src/middlewares/errors/error.middleware';
import cors from "cors";
import helmet from "helmet";
import {limiter} from "./src/middlewares/rateLimiter";
import { initializeDatabase } from './src/config/database.init';

dotenv.config();

const app: Express = express();

// CORS ayarları
app.use(cors({
    origin: '*', // Geliştirme ortamı için tüm originlere izin ver
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Helmet güvenlik ayarları
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Diğer middleware'ler
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(limiter);

// Veritabanı başlatma
initializeDatabase();

// API routes
app.use(routes);

// Error handling middleware
app.use(errorHandler);

app.listen(process.env.APP_PORT, () => console.log(`[✓] BBackerei sunucusu ${process.env.APP_PORT} portunda çalışıyor`));
