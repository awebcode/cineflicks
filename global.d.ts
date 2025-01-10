import NextAuth from "next-auth";

import { User, type Role } from "@prisma/client";
declare module "next-auth" {
  interface Session {
    user: Omit<User, "password">;
  }

  interface User {
    id: string;
    role: Role;
    name: string;
    email: string;
    image: string;
    walletAddress: string;
    couponCode: string;
    isSubmitted: boolean;
  }
}
