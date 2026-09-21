import { Router } from 'express';
import { requireAuth } from '../../common/middleware/require-auth';

// Not built yet. Owns swap sessions, assignments, uploads, flags and reviews.
// Follow the structure of the identity module.
export const sessionsRouter = Router();

sessionsRouter.use(requireAuth);

sessionsRouter.get('/', (_req, res) => {
  res.status(501).json({ error: { message: 'Sessions & Reviews module not implemented yet' } });
});
