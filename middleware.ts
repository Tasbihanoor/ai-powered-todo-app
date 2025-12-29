import { auth } from "@/lib/auth";
import { betterAuth } from "better-auth/next-js";

export const { middleware, withAuth } = betterAuth(auth);
export default middleware;

// Define which routes should be protected by authentication
export const config = {
  matcher: [
    // Protect dashboard routes
    "/dashboard/:path*",
    // Protect other authenticated routes as needed
    "/api/protected/:path*",
    // Skip authentication for public routes
    "/login",
    "/signup",
    "/api/auth/:path*",
    // Static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};