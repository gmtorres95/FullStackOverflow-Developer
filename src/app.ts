import express from 'express';
import cors from 'cors';

import usersRouter from './routers/usersRouter';
import questionsRouter from './routers/questionsRouter';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => res.sendStatus(200));
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use(errorHandler);

export default app;
