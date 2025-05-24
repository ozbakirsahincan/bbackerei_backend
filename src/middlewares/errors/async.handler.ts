import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Asenkron işleyiciler için hata yakalama yardımcısı
 * Promise hatalarını yakalayıp errorHandler'a iletir
 *
 * @param fn Controller fonksiyonu
 * @returns Hata yakalayan RequestHandler
 */
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
