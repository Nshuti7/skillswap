import RedisStore from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { SESSION_COOKIE_NAME, env, isProd } from './config/env';
import { errorHandler, notFoundHandler } from './common/middleware/error-handler';
import { redis } from './common/redis/redis';
import { openApiSpec } from './docs/openapi';
import { v1Router } from './routes';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// Middleware runs in the order registered here.
export function createApp() {
  const app = express();

  // Traefik terminates TLS in production. Trusting its X-Forwarded-Proto header
  // is what makes Express send `secure` cookies.
  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }));
  app.use(express.json({ limit: '1mb' }));

  // The browser holds only a signed session ID. Session data lives in Redis.
  app.use(
    session({
      store: new RedisStore({ client: redis, prefix: 'skillswap:sess:' }),
      name: SESSION_COOKIE_NAME,
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        maxAge: SEVEN_DAYS_MS,
      },
    }),
  );

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
  app.use('/api/v1', v1Router);

  // Must stay last.
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
