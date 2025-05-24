import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpError } from './error.types';

/**
 * Global hata yakalama middleware'i
 * Uygulamadaki tüm hataları yakalar ve uygun yanıtı döndürür
 */
export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error(err);

    // HttpError sınıfından türetilmiş özel hatalar
    if (err instanceof HttpError) {
        res.status(err.status).json({
            error: {
                status: err.status,
                message: err.message,
                ...(err.name === 'ValidationError' && { errors: (err as any).errors })
            }
        });
        return next();
    }

    // TypeORM özel hata yakalama
    if (err.name === 'QueryFailedError') {
        res.status(400).json({
            error: {
                status: 400,
                message: 'Veritabanı sorgu hatası',
                detail: process.env.NODE_ENV === 'development' ? err.message : undefined
            }
        });
        return next();
    }

    // Bilinmeyen hatalar için
    res.status(500).json({
        error: {
            status: 500,
            message: 'Sunucu hatası',
            detail: process.env.NODE_ENV === 'development' ? err.message : undefined
        }
    });
    return next();
};
