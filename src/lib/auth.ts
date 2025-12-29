import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';

export interface UserPayload {
  id: string;
  email: string;
  name: string;
}

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}

export function generateToken(payload: UserPayload): string {
  return sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): UserPayload | null {
  try {
    return verify(token, JWT_SECRET) as UserPayload;
  } catch (error) {
    return null;
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  (await cookies()).set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    sameSite: 'strict',
  });
}

export async function getAuthCookie(): Promise<string | undefined> {
  return (await cookies()).get('auth_token')?.value;
}

export async function removeAuthCookie(): Promise<void> {
  (await cookies()).delete('auth_token');
}

export async function getUserFromToken(): Promise<UserPayload | null> {
  const token = await getAuthCookie();
  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  if (!payload) {
    return null;
  }

  return payload;
}

export async function getUserByEmail(email: string) {
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return user[0] || null;
}

export async function getUserById(id: string) {
  const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user[0] || null;
}

export async function createUser(name: string, email: string, password: string) {
  const hashedPassword = await hashPassword(password);
  // Generate a simple UUID-like string without using crypto module
  const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  const [newUser] = await db.insert(users).values({
    id: userId,
    name,
    email,
    password: hashedPassword,
  }).returning();

  return { id: newUser.id, email: newUser.email, name: newUser.name };
}