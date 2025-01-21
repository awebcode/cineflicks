import { z } from "zod";

export const influencerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  couponCode: z.string().min(1, "Coupon code is required"),
  image: z.string().min(1, "Image is required"),
  expireTime: z.string().min(1, "Expire time is required"),
});

export type InfluencerUpdateArgs = z.infer<typeof influencerSchema>;