import { NextResponse } from "next/server";

export function headersMiddleware(response: NextResponse): NextResponse {
  const allowedOrigin = process.env.NEXT_PUBLIC_API_BASE_URL || "https://event-planner-api.onrender.com/api";

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Content-Type, Accept, Authorization");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
