import { Router } from 'express';
import { requireAuth } from '../../common/middleware/require-auth';

// Not built yet. Owns match discovery and swap requests (send, accept,
// decline). Follow the structure of the identity module.
export const matchingRouter = Router();

matchingRouter.use(requireAuth);

matchingRouter.get('/', (_req, res) => {
  res.status(501).json({ error: { message: 'Matching module not implemented yet' } });
});
