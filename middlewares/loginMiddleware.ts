import { NextRequest, NextResponse } from "next/server";

export function loginMiddleware(request: NextRequest, response: NextResponse): NextResponse {
  const url = new URL(request.url);
  const pathname = request.nextUrl.pathname;
  const homeUrl = new URL("/home", request.url);

  const token = url.searchParams.get("token");

  if (token && pathname === "/login") {
    response = NextResponse.redirect(homeUrl.toString(), 302);
    response.cookies.set("token", token, {
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
  matcher: ["/login"],
};

