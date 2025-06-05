// src/server.js
import app from './app.js';
import dotenv from 'dotenv';
import { ensureDatabaseExists } from './db/init.js'; // ✅ bunu ekliyoruz
import { seedInitialData } from './db/seeder.js';

dotenv.config();

console.log("server.js is running");

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    // ✅ Veritabanı kontrolü ve oluşturma
    await ensureDatabaseExists();
    await seedInitialData(); // ✅ Seeder burada çağrılıyor
    // ✅ Ardından server başlasın
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Sunucu başlatılamadı:", err);
  }
})();