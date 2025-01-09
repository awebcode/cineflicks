import * as z from "zod";

export const commentSchema = z.object({
  url: z.string().min(1, "URL is required").url("Please enter a valid URL"),
});

export type CommentFormData = z.infer<typeof commentSchema>;


export const bep20Schema = z.object({
  address: z
    .string()
    .min(1, "BEP20 address is required")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid BEP20 address format"),
});

export type Bep20FormData = z.infer<typeof bep20Schema>;


