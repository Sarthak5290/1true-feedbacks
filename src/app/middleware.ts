import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // If token exists and user tries to access public routes, redirect to dashboard
  if (token && ["/sign-in", "/sign-up", "/verify"].some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If no token and user tries to access protected routes, redirect to home
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Allow other requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/verify/:path*", "/dashboard/:path*"],
};
