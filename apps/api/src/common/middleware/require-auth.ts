import type { RequestHandler } from 'express';
import { HttpError } from '../errors/http-error';

export const requireAuth: RequestHandler = (req, _res, next) => {
  if (!req.session.userId) return next(HttpError.unauthorized());
  next();
};
