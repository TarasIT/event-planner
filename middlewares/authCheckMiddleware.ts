import { NextRequest, NextResponse } from "next/server";
import { protectedPaths } from "../app/data/protectedPaths";

export function authCheckMiddleware(request: NextRequest, response: NextResponse): NextResponse {
  const startUrl = new URL("/", request.url);
  const homeUrl = new URL("/home", request.url);
  const pathname = request.nextUrl.pathname;
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  const token = request.cookies.get("token");

  if (isProtectedPath && !token) {
    response = NextResponse.redirect(startUrl);
  }
  if (token && !isProtectedPath) {
    response = NextResponse.redirect(homeUrl);
  }

  return response;
}


export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
