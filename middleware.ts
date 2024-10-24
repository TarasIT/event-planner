import { NextRequest, NextResponse } from "next/server";
import { googleTokenMiddleware } from "./middlewares/googleTokenMiddleware"; // 1st
import { authMiddleware } from "./middlewares/authMiddleware";   // 2nd
import { googleLogoutMiddleware } from "./middlewares/googleLogoutMiddleware"; // 3rd
import { headersMiddleware } from "./middlewares/headersMiddleware"; // Final step

export function middleware(request: NextRequest): NextResponse {
  let response = NextResponse.next();

  // 1. Token Middleware: Handle token from query params
  response = googleTokenMiddleware(request, response);

  // 2. Auth Middleware: Check if the user is authorized to access protected paths
  response = authMiddleware(request, response);

  // 3. Logout Middleware: Handle logout request
  response = googleLogoutMiddleware(request, response);

  // 4. Headers Middleware: Apply headers to all responses
  response = headersMiddleware(response);

  return response;
}


// import { NextRequest, NextResponse } from "next/server";
// import { protectedPaths } from "./app/data/protectedPaths";

// export function middleware(request: NextRequest): NextResponse {
//   const url = new URL(request.url);
//   const pathname = request.nextUrl.pathname;
//   const startUrl = new URL("/", request.url);
//   const homeUrl = new URL("/home", request.url);
//   const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
//   const allowedOrigin = process.env.NEXT_PUBLIC_API_BASE_URL || "https://event-planner-api.onrender.com/api";

//   const queryToken = url.searchParams.get("token");
//   let response = NextResponse.next();;

//   if (queryToken && !isProtectedPath && pathname !== "/reset-password") {
//     response = NextResponse.redirect(homeUrl.toString(), 302);
//     response.cookies.set("token", queryToken, {
//       maxAge: 60 * 60 * 24 * 7, 
//       httpOnly: true,
//       sameSite: "strict",
//       path: "/",
//     });
//     url.searchParams.delete("token");
//   } else {
//     const token = request.cookies.get("token");    

//     switch (true) {
//       case token && !isProtectedPath:
//         if (pathname !== "/home") {
//           response = NextResponse.redirect(homeUrl);
//         } else {
//           response = NextResponse.next();
//         }
//         break;
//       case !token && isProtectedPath:
//         if (pathname !== "/") {
//           response = NextResponse.redirect(startUrl);
//         } else {
//           response = NextResponse.next();
//         }
//         break;
//       case token && isProtectedPath:
//         if (pathname === "/logout") {
//           response = NextResponse.redirect(startUrl);
//           response.cookies.set("token", "", { maxAge: 0, path: "/" });
//         } else {
//           response = NextResponse.next();
//         }
//         break;
//       default:
//         response = NextResponse.next();
//         break;
//     }
//   }

//   response.headers.set("Access-Control-Allow-Credentials", "true");
//   response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
//   response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   response.headers.set("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Content-Type, Accept, Authorization");

//   return response;
// }

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

