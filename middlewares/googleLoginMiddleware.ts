import { protectedPaths } from "@/app/data/protectedPaths";
import { NextRequest, NextResponse } from "next/server";

export function googleLoginMiddleware(request: NextRequest, response: NextResponse): NextResponse {
  const url = new URL(request.url);
  const pathname = request.nextUrl.pathname;
  const homeUrl = new URL("/home", request.url);
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  
  const queryGoogleToken = url.searchParams.get("token");

  if (queryGoogleToken && !isProtectedPath && pathname !== "/reset-password") {
    response = NextResponse.redirect(homeUrl.toString(), 302);
    response.cookies.set("token", queryGoogleToken, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: "none", 
      path: "/",
    });
    url.searchParams.delete("token");
  }

  return response;
}


export const config = {
  matcher: ["/"],
};
