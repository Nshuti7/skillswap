// Throw these from anywhere; the global error handler turns them into JSON
// responses with the right status.
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'HttpError';
  }

  static badRequest(message = 'Bad request', details?: unknown) {
    return new HttpError(400, message, details);
  }
  static unauthorized(message = 'Not authenticated') {
    return new HttpError(401, message);
  }
  static forbidden(message = 'Forbidden') {
    return new HttpError(403, message);
  }
  static notFound(message = 'Not found') {
    return new HttpError(404, message);
  }
  static conflict(message = 'Conflict') {
    return new HttpError(409, message);
  }
}
