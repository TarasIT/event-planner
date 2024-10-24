import { NextRequest, NextResponse } from "next/server";

export function googleLogoutMiddleware(request: NextRequest, response: NextResponse): NextResponse {
  const pathname = request.nextUrl.pathname;
  const startUrl = new URL("/", request.url);

  if (pathname === "/logout") {
    response = NextResponse.redirect(startUrl); 
    response.cookies.delete("token");
  }

  return response;
}

export const config = {
  matcher: ["/logout"], 
};
