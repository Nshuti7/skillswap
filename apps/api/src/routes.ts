import { Router } from 'express';
import { communicationRouter } from './modules/communication/communication.routes';
import { identityRouter } from './modules/identity/identity.routes';
import { matchingRouter } from './modules/matching/matching.routes';
import { sessionsRouter } from './modules/sessions/sessions.routes';

// Mounted under /api/v1. Versioning the URL lets a future v2 change contracts
// without breaking clients still on v1.
export const v1Router = Router();

v1Router.use('/auth', identityRouter);
v1Router.use('/matches', matchingRouter);
v1Router.use('/conversations', communicationRouter);
v1Router.use('/swap-sessions', sessionsRouter);
