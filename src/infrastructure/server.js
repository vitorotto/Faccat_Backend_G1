import express from 'express';
import { errorHandler, requestNotFound } from '../middlewares/errorHandler.js';
import adminRoutes from './http/routes/adminRoutes.js';
import collectionPointsRoutes from './http/routes/collectionPointsRoute.js';
import userRoutes from './http/routes/userRoute.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API está rodando na Azure' });
});

app.use(express.json());
app.use('/api/users', userRoutes); 
app.use('/api/collection-points', collectionPointsRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res, next) => requestNotFound(req, res));
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});