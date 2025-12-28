
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import * as schema from '../db/schema';

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "https://ai-powered-todo-app-sandy.vercel.app",
    adapter: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
            user: schema.user
        }
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {},
    trustedOrigins: [
        "https://ai-powered-todo-app-sandy.vercel.app"
    ],
    cookies: {
        domain: process.env.NODE_ENV === 'production'
            ? 'ai-powered-todo-app-sandy.vercel.app'
            : undefined,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    },
    // Add other providers or plugins here as needed
});
