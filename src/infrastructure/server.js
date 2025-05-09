import express from 'express';
import userRoutes from './database/http/routes/userRoute.js'; // Importe suas rotas
import { requestNotFound } from './database/http/routes/errorHandler.js'; // Se for usar

const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.use('/api/users', userRoutes); 

app.use(requestNotFound); // Se você implementar isso corretamente

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});