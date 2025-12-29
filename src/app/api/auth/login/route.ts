import { NextRequest } from 'next/server';
import { setAuthCookie, verifyPassword, getUserByEmail, generateToken } from '@/lib/auth';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);
    if (!user || !user.password) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = generateToken({ id: user.id, email: user.email, name: user.name });
    await setAuthCookie(token);

    return Response.json({
      user: { id: user.id, email: user.email, name: user.name },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}