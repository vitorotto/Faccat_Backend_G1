import express from 'express';
import { errorHandler, requestNotFound } from '../middlewares/errorHandler.js';
import adminRoutes from './http/routes/adminRoutes.js';
import collectionPointsRoutes from './http/routes/collectionPointsRoute.js';
import userRoutes from './http/routes/userRoute.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', userRoutes); 
app.use('/api/collection-points', collectionPointsRoutes);
app.use('/api/admin', adminRoutes)

app.use((req, res, next) => requestNotFound(req, res));
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});