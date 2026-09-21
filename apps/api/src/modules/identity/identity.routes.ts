import { Router } from 'express';
import { requireAuth } from '../../common/middleware/require-auth';
import { validateBody } from '../../common/middleware/validate';
import * as controller from './identity.controller';
import { loginSchema, registerSchema } from './identity.schemas';

export const identityRouter = Router();

identityRouter.post('/register', validateBody(registerSchema), controller.register);
identityRouter.post('/login', validateBody(loginSchema), controller.login);
identityRouter.post('/logout', requireAuth, controller.logout);
identityRouter.get('/me', requireAuth, controller.me);

// TODO(identity pair): profile update, UserSkill CRUD (teach / want to learn),
// portfolio submission and manual review queue.
