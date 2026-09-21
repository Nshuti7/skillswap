import bcrypt from 'bcryptjs';
import type { User } from '@prisma/client';
import type { UserDTO } from '@skillswap/shared';
import { prisma } from '../../common/db/prisma';
import { HttpError } from '../../common/errors/http-error';
import type { LoginInput, RegisterInput } from './identity.schemas';

const SALT_ROUNDS = 12;

// Strips passwordHash and anything else private before it leaves the API.
export function toUserDTO(user: User): UserDTO {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    bio: user.bio,
    skillLevel: user.skillLevel,
    portfolioStatus: user.portfolioStatus,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function register(input: RegisterInput): Promise<User> {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw HttpError.conflict('An account with this email already exists');

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
  return prisma.user.create({
    data: { email: input.email, name: input.name, passwordHash },
  });
}

export async function login(input: LoginInput): Promise<User> {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  const passwordOk = user ? await bcrypt.compare(input.password, user.passwordHash) : false;

  // Same message for both failures, so the response cannot be used to find out
  // which emails are registered.
  if (!user || !passwordOk) throw HttpError.unauthorized('Invalid email or password');
  return user;
}

export async function getById(id: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw HttpError.notFound('User not found');
  return user;
}
