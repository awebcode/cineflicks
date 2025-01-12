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

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
];

export const videoFormSchema = z.object({
  video: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Video is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 500MB.`
    )
    .refine(
      (files) => ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type),
      "Only .mp4, .mov, and .avi formats are supported."
    ),
  videoUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  title: z
    .string()
    .min(1, "Title is required")
    .max(20, "Title must be less than 20 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description must be less than 300 words"),
  timing: z.string().min(1, "Timing is required"),
  language: z.string().min(1, "Language is required"),
  cast: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Cast name is required"),
        bio: z.string().min(1, "Cast bio is required"),
      })
    )
    .min(1, "At least one cast member is required"),
});

export type VideoFormValues = z.infer<typeof videoFormSchema>;
