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

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(helmet());
app.use(limiter);

// Veritabanı başlatma
initializeDatabase();

// Router'ı uygulama ana yoluna bağla
app.use('/', routes);

// Error handling middleware
app.use(errorHandler);

app.listen(5000, () => console.log("[✓] BBackerei sunucusu 5000 portunda çalışıyor"));
