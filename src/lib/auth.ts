
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import * as schema from '../db/schema';

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET || "very-long-secret-key-at-least-32-characters-for-production",
    baseURL: process.env.BETTER_AUTH_URL || "https://ai-powered-todo-app-sandy.vercel.app",
    adapter: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
            user: schema.user
        }
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false, // Set to true if you want email verification
    },
    socialProviders: {},
    trustedOrigins: [
        "https://ai-powered-todo-app-sandy.vercel.app",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002"
    ],
    cookies: {
        domain: process.env.NODE_ENV === 'production'
            ? undefined // Remove explicit domain to allow default behavior
            : undefined,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    },
    // Add other providers or plugins here as needed
});
