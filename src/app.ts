import express from 'express';
import cors from 'cors';

import * as userController from './controllers/userController';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => res.sendStatus(200));

app.post('/users', userController.createUser);

app.use(errorHandler);

export default app;
