import type { RequestHandler } from 'express';
import type { ZodSchema } from 'zod';
import { HttpError } from '../errors/http-error';

// Replaces req.body with the parsed result, so controllers get cleaned data:
// emails lower-cased, unknown fields stripped.
export const validateBody =
  (schema: ZodSchema): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(HttpError.badRequest('Validation failed', result.error.flatten().fieldErrors));
    }
    req.body = result.data;
    next();
  };
