import { request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: request;
    }
  }
}
