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
      
      // await verifyJwt({
      //     token,
      //     secret: process.env.AUTH_SECRET || "",
      //   });
      
      try {
        
        payload = {
          id: null,
          name: null,
          email: null,
          image: null,
          role: null,
        };
        payload = await verifyJwt({ token, secret: process.env.SECRET_KEY as string });
      } catch (error) {
        console.error("JWT verification failed:", error);
      }
    }

    const isLoggedIn = !!payload?.id; // Check if user is logged in
    const isAdmin = payload?.role === Role.ADMIN; // Check if user has admin role
    const urlPath = req.nextUrl.pathname;

    // Allow public routes to be accessed without authentication
    if (PUBLIC_ROUTES.includes(urlPath)) {
      return NextResponse.next();
    }

    // Restrict admin routes to only admin users
    if (ADMIN_ROUTES.some((route) => urlPath.startsWith(route)) && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect non-admins to the home page
    }

    // Restrict authenticated routes to only logged-in users
    if (AUTHENTICATED_ROUTES.includes(urlPath) && !isLoggedIn) {
      return NextResponse.redirect(new URL("/sign-in", req.url)); // Redirect unauthenticated users to sign-in
    }

    // Allow access to all other routes for any user
    const response = NextResponse.next();

    // Set the coupon code cookie in the response
    // Set couponCode in cookies
    const couponCode = req.nextUrl.searchParams.get("couponCode");
    const storedCouponCode = req.cookies.get("couponCode")?.value;
    if (couponCode && couponCode !== storedCouponCode) {
      response.cookies.set("couponCode", couponCode);
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
