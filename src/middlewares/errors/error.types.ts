/**
 * Hata tipi tanımlamaları
 * HTTP yanıtları için kullanılan hata sınıfları
 */

export class HttpError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends HttpError {
    constructor(message = 'Geçersiz istek') {
        super(message, 400);
    }
}

export class ValidationError extends BadRequestError {
    errors: any;

    constructor(message = 'Doğrulama hatası', errors = {}) {
        super(message);
        this.errors = errors;
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message = 'Kimlik doğrulama gerekli') {
        super(message, 401);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message = 'Bu işlem için yetkiniz yok') {
        super(message, 403);
    }
}

export class NotFoundError extends HttpError {
    constructor(message = 'Kaynak bulunamadı') {
        super(message, 404);
    }
}

export class ConflictError extends HttpError {
    constructor(message = 'Kaynak zaten mevcut') {
        super(message, 409);
    }
}

export class InternalServerError extends HttpError {
    constructor(message = 'Sunucu hatası') {
        super(message, 500);
    }
}

export class DatabaseError extends HttpError {
    constructor(message = 'Veritabanı hatası') {
        super(message, 500);
    }
}
