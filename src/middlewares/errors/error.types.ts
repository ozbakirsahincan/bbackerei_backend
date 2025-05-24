export class AppError extends Error {
    public statusCode: number;
    public status: string;
    public isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Kayıt bulunamadı") {
        super(message, 404);
    }
}

export class ValidationError extends AppError {
    constructor(message: string = "Geçersiz veri") {
        super(message, 400);
    }
}

export class DatabaseError extends AppError {
    constructor(message: string = "Veritabanı hatası") {
        super(message, 500);
    }
}
