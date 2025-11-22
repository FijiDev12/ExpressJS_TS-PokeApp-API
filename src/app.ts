import dotenv from 'dotenv';
import express from 'express';
import generalRoutes from './routes/general-ext.routes';



dotenv.config(); // MUST be at the top



const app = express();

app.use(express.json());

app.use('/api', generalRoutes);

export default app;