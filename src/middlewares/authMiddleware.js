import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Token nao fornecido'})
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (err) {
        return res.status(401).json({ error: 'Token invalido'})
    }
}