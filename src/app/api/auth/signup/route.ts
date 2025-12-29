import { NextRequest } from 'next/server';
import { setAuthCookie, getUserByEmail, createUser, generateToken } from '@/lib/auth';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = signupSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return Response.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const user = await createUser(name, email, password);
    const token = generateToken({ id: user.id, email: user.email, name: user.name });
    await setAuthCookie(token);

    return Response.json({
      user,
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}