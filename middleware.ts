import { NextRequest, NextResponse } from "next/server";
import { protectedPaths } from "./app/data/protectedPaths";

export function middleware(request: NextRequest): NextResponse {
  const url = new URL(request.url);
  const pathname = request.nextUrl.pathname;
  const startUrl = new URL("/", request.url);
  const homeUrl = new URL("/home", request.url);
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  const allowedOrigin = process.env.NEXT_PUBLIC_API_BASE_URL || "https://event-planner-api.onrender.com/api";

  const queryToken = url.searchParams.get("token");
  let response;

  if (queryToken && !isProtectedPath && pathname !== "/reset-password") {
    response = NextResponse.redirect(homeUrl.toString(), 302);
    response.cookies.set("token", queryToken, {
      maxAge: 60 * 60 * 24 * 7, 
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
    url.searchParams.delete("token");
  } else {
    const token = request.cookies.get("token");

    switch (true) {
      case token && !isProtectedPath:
        if (pathname !== "/home") {
          response = NextResponse.redirect(homeUrl);
        } else {
          response = NextResponse.next();
        }
        break;
      case !token && isProtectedPath:
        if (pathname !== "/") {
          response = NextResponse.redirect(startUrl);
        } else {
          response = NextResponse.next();
        }
        break;
      default:
        response = NextResponse.next();
        break;
    }
  }

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Content-Type, Accept, Authorization");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

