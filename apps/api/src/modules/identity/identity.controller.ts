import type { Request, Response } from 'express';
import { SESSION_COOKIE_NAME } from '../../config/env';
import { asyncHandler } from '../../common/utils/async-handler';
import * as identityService from './identity.service';

// Issues a new session ID. Reusing the pre-login ID would allow session
// fixation: an attacker plants a known ID, then rides it once the user logs in.
function startSession(req: Request, userId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    req.session.regenerate((err) => {
      if (err) return reject(err);
      req.session.userId = userId;
      req.session.save((saveErr) => (saveErr ? reject(saveErr) : resolve()));
    });
  });
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await identityService.register(req.body);
  await startSession(req, user.id);
  res.status(201).json({ user: identityService.toUserDTO(user) });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await identityService.login(req.body);
  await startSession(req, user.id);
  res.json({ user: identityService.toUserDTO(user) });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  await new Promise<void>((resolve, reject) =>
    req.session.destroy((err) => (err ? reject(err) : resolve())),
  );
  res.clearCookie(SESSION_COOKIE_NAME);
  res.status(204).send();
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  // requireAuth guarantees userId is set.
  const user = await identityService.getById(req.session.userId!);
  res.json({ user: identityService.toUserDTO(user) });
});
