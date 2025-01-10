import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { encodeJwt, verifyJwt } from "./lib/utils";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Include user ID in the token
      if (user) {
        token.id = user?.id;
        token.role = user?.role;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.walletAddress = user.walletAddress;
        token.couponCode = user.couponCode;
        token.isSubmitted = user.isSubmitted;
      }
      return token;
    },
    async session({ session, token }) {
      // Map all token properties to session.user
      if (token) {
        session.user = {
          ...token, // Spread all properties from the token
        } as any;
      }
      return session;
    },
  },
  jwt: {
    encode: async ({ token, secret }) => {
      const payload = {
        id: token?.id,
        name: token?.name,
        email: token?.email,
        image: token?.image,
        role: token?.role,
      };
      return await encodeJwt({ payload, secret: secret as string });
    },
    decode: async ({ token, secret }) => {
      return await verifyJwt({ token: token as string, secret: secret as string });
    },
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: "session_token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
        priority: "high",
      },
    },
  },
  pages: {
    error: "/auth/error",
    signIn: "/sign-in",
  },
  logger: {
    error: () => {}, // Disable error logging
    warn: () => {}, // Disable warnings
    debug: () => {}, // Disable debug logs
  },
  
});
