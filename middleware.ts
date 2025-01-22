import { Role } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { verifyJwt } from "./lib/utils";

const ADMIN_ROUTES = ["/admin", "/dashboard", "/influencer"];
const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
const AUTHENTICATED_ROUTES = ["/profile", "/profile/[id]"];

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get("session_token")?.value;

    let payload = null;
    if (token) {
      payload = await verifyJwt({
        token,
        secret: process.env.AUTH_SECRET!,
      });
    }

    const isLoggedIn = !!payload?.id;
    const isAdmin = payload?.role === Role.ADMIN;
    const { pathname } = req.nextUrl;

    // Handle coupon code
    const couponCode = req.nextUrl.searchParams.get("couponCode");
    if (couponCode) {
      const response = NextResponse.next();
      response.cookies.set("couponCode", couponCode);
      return response;
    }

    // Public routes
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.next();
    }

    // Admin routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/influencer")) {
      return isAdmin
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/", req.url));
    }

    // Authenticated routes
    if (AUTHENTICATED_ROUTES.some((route) => pathname.startsWith(route))) {
      return isLoggedIn
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Allow access to all other routes
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
