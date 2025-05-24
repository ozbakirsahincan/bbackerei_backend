// src/middleware/rateLimiter.ts
import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100,                 // 15 dakikada maksimum 100 istek
    message: "Çok fazla istek yaptınız, lütfen daha sonra tekrar deneyin."
});
