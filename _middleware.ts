import { Role } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { verifyJwt } from "./lib/utils";

const ADMIN_ROUTES = ["/admin", "/dashboard", "/influencer"]; // Admin-specific routes
const PUBLIC_ROUTES = ["/sign-in", "/sign-up"]; // Public routes
const AUTHENTICATED_ROUTES = ["/profile", "/profile/[id]"]; // Authenticated routes

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;

  const payload = await verifyJwt({
    token: token as string,
    secret: process.env.AUTH_SECRET!,
  });

  const isLoggedIn = !!payload?.id; // Check if user is logged in
  const isAdmin = payload?.role === Role.ADMIN; // Check if user has admin role
  const urlPath = req.nextUrl.pathname;

  // Set couponCode in cookies
  const couponCode = req.nextUrl.searchParams.get("couponCode");
  const storedCouponCode = req.cookies.get("couponCode")?.value;
  if (couponCode && couponCode !== storedCouponCode) {
    (await cookies()).set("couponCode", couponCode);
  }

  // Allow public routes to be accessed without authentication
  if (PUBLIC_ROUTES.includes(urlPath)) {
    return NextResponse.next();
  }

  // Restrict admin routes to only admin users
  if (urlPath.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect non-admins to the home page
  }

  // Restrict influencer routes to only admin users
  if (urlPath.startsWith("/influencer") && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect non-admins to the home page
  }

  // Restrict authenticated routes to only logged-in users
  if (AUTHENTICATED_ROUTES.includes(urlPath) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect unauthenticated users to sign-in
  }

  // Allow access to all other routes for any user
  return NextResponse.next();
}

// Middleware configuration to match all routes except API, static, and images
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
