import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().min(1, "URL is required"),
  userId: z.string().min(1, "User ID is required"),
  platform: z.string().min(1, "Platform is required"),
  socialUrl: z.string().min(1, "Social URL is required"),
});