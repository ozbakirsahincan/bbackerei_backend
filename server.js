import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import routes from './src/config/routes.config.js';
import { initializeDatabase } from './src/config/databaseInitializer.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Sadece merkezi router'ı ekle
app.use('/',routes);

// Veritabanını başlat
initializeDatabase().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`[✓] Sunucu ${process.env.PORT || 5001} portunda çalışıyor`);
    });
}).catch(err => {
    console.error('Veritabanı başlatılırken hata:', err);
});