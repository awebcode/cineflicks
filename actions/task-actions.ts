"use server";

import { prisma } from "@/lib/prisma";
import  { createTaskSchema } from "@/lib/task-schema";
import { z } from "zod";

export const createTask = async (formData: z.infer<typeof createTaskSchema>) => {
  try {
    const { title, url, userId, platform, socialUrl } = await createTaskSchema.parseAsync(
      formData
    );
    const data = await prisma.task.create({
      data: {
        title,
        // description: formData.description,
        url,
        userId,
        platform,
        socialUrl,
      },
    });
    return {
      success: true,
      message: "Task submitted successfully",
      data,
    };
  } catch (error) {
    console.log({ error });
    return {
      error: true,
      message: "Task creation failed",
    };
  }
};



