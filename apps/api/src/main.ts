import { prisma } from './common/db/prisma';
import { redis } from './common/redis/redis';
import { env } from './config/env';
import { createApp } from './app';

async function bootstrap() {
  await prisma.$connect();

  const app = createApp();
  const server = app.listen(env.PORT, () => {
    console.log(`SkillSwap API on http://localhost:${env.PORT}`);
    console.log(`Docs on http://localhost:${env.PORT}/api/docs`);
  });

  const shutdown = async (signal: string) => {
    console.log(`${signal} received, shutting down`);
    server.close();
    await prisma.$disconnect();
    redis.disconnect();
    process.exit(0);
  };
  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
}

bootstrap().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
