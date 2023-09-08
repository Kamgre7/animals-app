import express, { Application } from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import { animalsRouter } from './routes/animalsRouter';
import { appConfig } from './config/appConfig';
import { errorHandler } from './middlewares/errorHandler';

export class Bootstrap {
  private readonly app: Application;

  constructor() {
    this.app = express();

    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandler();
    this.startServer();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
  }

  private configureRoutes() {
    this.app.use('/animals', animalsRouter);
  }

  private configureErrorHandler(): void {
    this.app.use(errorHandler);
  }

  private startServer() {
    this.app.listen(appConfig.port, appConfig.hostName, () => {
      console.log(
        `Application is running on ${appConfig.host}:${appConfig.port}`
      );
    });
  }
}

new Bootstrap();
