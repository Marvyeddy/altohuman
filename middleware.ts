import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Define Public Routes
    const isPublicRoute = 
        pathname === "/" || 
        pathname.startsWith("/register") || 
        pathname.startsWith("/login") || 
        pathname.startsWith("/forget-password") || 
        pathname.startsWith("/reset-password");

    // 2. Check Session
    const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
        headers: {
            cookie: request.headers.get("cookie") || "",
        },
    });

    const session = await response.json();

    // 3. Redirect Logic
    // If no session (Better Auth returns null/empty on no session)
    if (!session || Object.keys(session).length === 0) {
        if (!isPublicRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } else {
        // If user IS logged in, don't let them go back to login/register
        if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
