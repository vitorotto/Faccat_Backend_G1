import express from 'express';
import { errorHandler, requestNotFound } from '../middlewares/errorHandler.js';
import collectionPointsRoutes from './http/routes/collectionPointsRoute.js';
import userRoutes from './http/routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', userRoutes); 
app.use('/api/collection-points', collectionPointsRoutes);

app.use(errorHandler);
app.use(requestNotFound);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});