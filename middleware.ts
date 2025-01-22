import { Role } from "@prisma/client";
import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_ROUTES = ["/admin", "/dashboard", "/influencer"];
const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
const AUTHENTICATED_ROUTES = ["/profile", "/profile/[id]"];
const verifyJwt = async ({
  token,
  secret,
}: {
  token: string;
  secret: string;
}) => {
  const secretKey = new TextEncoder().encode(secret || "");
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error: any) {
    return null; // In case of verification failure
  }
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;

  const payload = token
    ? await verifyJwt({ token, secret: process.env.AUTH_SECRET! })
    : null;

  const isLoggedIn = !!payload?.id;
  const isAdmin = payload?.role === Role.ADMIN;
  const urlPath = req.nextUrl.pathname;

  if (PUBLIC_ROUTES.includes(urlPath)) {
    return NextResponse.next();
  }

  if (ADMIN_ROUTES.some((route) => urlPath.startsWith(route)) && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (AUTHENTICATED_ROUTES.includes(urlPath) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const response = NextResponse.next();
  const couponCode = req.nextUrl.searchParams.get("couponCode");
  const storedCouponCode = req.cookies.get("couponCode")?.value;

  if (couponCode && couponCode !== storedCouponCode) {
    response.cookies.set("couponCode", couponCode);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
