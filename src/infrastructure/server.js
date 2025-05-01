import express from 'express'

const app = express()
const PORT = 3000

app.listen(PORT, (req, res) => {
    console.log('Server rodando na porta: http://localhost:' + PORT)
})