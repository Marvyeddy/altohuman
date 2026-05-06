import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublicRoute = 
        pathname === "/" || 
        pathname.startsWith("/register") || 
        pathname.startsWith("/login") || 
        pathname.startsWith("/forget-password") || 
        pathname.startsWith("/reset-password");

    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        if (!isPublicRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } else {
        if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
