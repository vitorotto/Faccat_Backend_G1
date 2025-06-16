import { HttpError } from '../errors/HttpErrors.js';

export const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            code: err.statusCode,
            message: err.message
        });
    }

    console.error(err);
    return res.status(500).json({
        code: 500,
        message: 'Erro interno no servidor'
    });
};

export const requestNotFound = (req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Route not found'
  });
};
