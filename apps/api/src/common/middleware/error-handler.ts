import type { ErrorRequestHandler, RequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import type { ApiErrorResponse } from '@skillswap/shared';
import { HttpError } from '../errors/http-error';

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(HttpError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
};

// Express identifies error middleware by its four arguments, so `_next` stays
// even though it is unused.
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const send = (status: number, body: ApiErrorResponse) => res.status(status).json(body);

  if (err instanceof HttpError) {
    send(err.status, { error: { message: err.message, details: err.details } });
    return;
  }

  // P2002 is a unique constraint violation.
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
    send(409, { error: { message: 'Resource already exists' } });
    return;
  }

  console.error(err);
  send(500, { error: { message: 'Internal server error' } });
};
