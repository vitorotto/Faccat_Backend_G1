import express from 'express';
import userRoutes from './http/routes/userRoute.js'; 
// import { requestNotFound } from './http/routes/errorHandler.js';

const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.use('/api/users', userRoutes); 

// app.use(requestNotFound);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});