import { removeAuthCookie } from '@/lib/auth';

export async function POST() {
  try {
    // Remove the auth cookie
    await removeAuthCookie();

    return Response.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return Response.json({ error: 'Logout failed' }, { status: 500 });
  }
}