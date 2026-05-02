import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Define Public Routes
    const isPublicRoute = 
        pathname === "/" || 
        pathname.startsWith("/register") || 
        pathname.startsWith("/login") || 
        pathname.startsWith("/forget-password") || 
        pathname.startsWith("/reset-password");

    // 2. Check Session via Cookie (Fastest & Safest in Middleware)
    // Better Auth stores the session in a cookie. Checking for its existence 
    // is enough for middleware redirection logic.
    const sessionCookie = getSessionCookie(request);

    // 3. Redirect Logic
    if (!sessionCookie) {
        // If NO session and trying to access a private route
        if (!isPublicRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } else {
        // If user IS logged in, don't let them visit login/register
        if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // This matcher excludes internal Next.js files and the auth API itself
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
