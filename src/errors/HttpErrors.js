export class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends HttpError {
    constructor(message) {
        super(message, 400);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message) {
        super(message, 401);
    }
}

export class NotFoundError extends HttpError {
    constructor(message) {
        super(message, 404);
    }
}

export class ConflictError extends HttpError {
    constructor(message) {
        super(message, 409);
    }
}
