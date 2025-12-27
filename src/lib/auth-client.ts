
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000" || "https://ai-powered-todo-app-sandy.vercel.app"
})

export const { useSession } = authClient;
