import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/"];

export function middleware(request) {
  const authCookie = request.cookies.get("auth")?.value;
  const isPublic = PUBLIC_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );
  if (!authCookie || !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/instructor/:path*", "/student/:path*"],
};
