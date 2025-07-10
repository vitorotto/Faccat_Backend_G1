import { HttpError } from '../errors/HttpErrors.js';

export const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            code: err.statusCode,
            message: err.message
        });
    }

    if (err?.name === 'PrismaClientKnownRequestError') {
        const errorMap = {
            'P2002': { status: 409, message: 'Registro duplicado' },
            'P2014': { status: 400, message: 'Violação de chave estrangeira' },
            'P2025': { status: 404, message: 'Registro não encontrado' },
            'P2003': { status: 400, message: 'Violação de restrição de banco de dados' }
        };

        const mappedError = errorMap[err.code] || { 
            status: 500, 
            message: 'Erro no banco de dados' 
        };
        
        return res.status(mappedError.status).json({
            code: mappedError.status,
            message: mappedError.message,
        });


    }

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