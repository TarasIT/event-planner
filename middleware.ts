import { NextRequest, NextResponse } from "next/server";
import { loginMiddleware } from "./middlewares/loginMiddleware";
import { authCheckMiddleware } from "./middlewares/authCheckMiddleware";
import { logoutMiddleware } from "./middlewares/logoutMiddleware";
import { headersMiddleware } from "./middlewares/headersMiddleware";

export function middleware(request: NextRequest): NextResponse {
  let response = NextResponse.next();

  response = loginMiddleware(request, response);

  response = authCheckMiddleware(request, response);

  response = logoutMiddleware(request, response);

  response = headersMiddleware(response);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

