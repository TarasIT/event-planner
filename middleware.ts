import { NextRequest, NextResponse } from "next/server";
import { googleLoginMiddleware } from "./middlewares/googleLoginMiddleware";
import { authMiddleware } from "./middlewares/authMiddleware";
import { googleLogoutMiddleware } from "./middlewares/googleLogoutMiddleware";
import { headersMiddleware } from "./middlewares/headersMiddleware";

export function middleware(request: NextRequest): NextResponse {
  let response = NextResponse.next();

  response = googleLoginMiddleware(request, response);

  response = authMiddleware(request, response);

  response = googleLogoutMiddleware(request, response);

  response = headersMiddleware(response);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

