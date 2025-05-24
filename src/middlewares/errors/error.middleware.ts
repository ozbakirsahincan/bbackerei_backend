import { Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from 'express';
import { AppError } from './error.types';

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
        return;
    }

    // Beklenmeyen hatalar için
    console.error('[X] Beklenmeyen Hata:', err);
    res.status(500).json({
        status: 'error',
        message: 'Bir hata oluştu'
    });
};

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const asyncHandler = (fn: AsyncFunction): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
