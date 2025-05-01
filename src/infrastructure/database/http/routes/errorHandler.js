// Gerencia erros de rotas
import express from 'express'

const route = express()

export const requestNotFound = (req, res) => {
    route.status(404).json({ error: "Page not found" })
}

