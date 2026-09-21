import { Router } from 'express';
import { requireAuth } from '../../common/middleware/require-auth';

// Not built yet. Owns in-app chat after a request is accepted, and
// notifications. Follow the structure of the identity module.
export const communicationRouter = Router();

communicationRouter.use(requireAuth);

communicationRouter.get('/', (_req, res) => {
  res.status(501).json({ error: { message: 'Communication module not implemented yet' } });
});
