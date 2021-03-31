import express, { Application } from 'express';

import authRoutes from './routes/authRoutes';

class App {
  app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use('/api/user', authRoutes);
  }
}

export default new App().app;
