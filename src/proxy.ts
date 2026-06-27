import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const session = await decrypt(sessionCookie);
      if (!session || !session.admin) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect authenticated users away from the login page
  if (pathname.startsWith("/admin/login") && sessionCookie) {
    try {
      const session = await decrypt(sessionCookie);
      if (session && session.admin) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } catch (error) {
      // Invalid session, let them stay on login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
