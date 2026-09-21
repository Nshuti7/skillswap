import { PrismaClient } from '@prisma/client';
import { isProd } from '../../config/env';

// One client for the whole app. Each holds a connection pool, so one per
// request would exhaust Postgres connections.
export const prisma = new PrismaClient({
  log: isProd ? ['error'] : ['warn', 'error'],
});
