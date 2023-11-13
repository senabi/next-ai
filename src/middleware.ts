import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  signInUrl: "/sign-in",
  ignoredRoutes: ["/home"],
  publicRoutes: [
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/sso-callback(.*)",
    "/",
    "/api(.*)",
  ],
  afterAuth: (auth, req) => {
    //if (auth.userId && req.nextUrl.pathname === "/sign-in") {
    //  const url = new URL(req.nextUrl.origin);
    //  url.pathname = "/talk";
    //  return NextResponse.redirect(url);
    //}
    if (!auth.userId && !auth.isPublicRoute) {
      const url = new URL(req.nextUrl.origin);
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
