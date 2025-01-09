import { Role } from "@prisma/client";
import { z } from "zod";

export const updateUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  walletAddress: z.string().min(1, "Wallet address is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  role: z.nativeEnum(Role),
  couponCode: z.string().min(1, "Coupon code is required"),
});

export type UpdateUserArgs= z.infer<typeof updateUserSchema>;