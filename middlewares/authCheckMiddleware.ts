import { NextRequest, NextResponse } from "next/server";
import { protectedPaths } from "../app/data/protectedPaths";

export function authCheckMiddleware(request: NextRequest, response: NextResponse): NextResponse {
  const homeUrl = new URL("/home", request.url);
  const pathname = request.nextUrl.pathname;
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  const token = request.cookies.get("token")?.value;

  if (token && !isProtectedPath) {
    response = NextResponse.redirect(homeUrl);
  }

  return response;
}


export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
