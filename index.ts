import express from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import { appConfig } from './src/config/appConfig';
import { animalsRouter } from './src/routes/animalsRouter';
import { errorHandler } from './src/middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/animals', animalsRouter);

app.use(errorHandler);

app.listen(appConfig.port, appConfig.hostName, () => {
  console.log(`Application is running on ${appConfig.host}:${appConfig.port}`);
});
