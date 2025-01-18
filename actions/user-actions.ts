"use server";

import {  signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateUserSchema, type UpdateUserArgs } from "@/lib/user-schema";
import { z } from "zod";
const updateWalAddressSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  walletAddress: z.string().min(1, "Wallet address is required"),
  isSubmitted: z.boolean(),
});
export const updateWalletAddress = async (
  formData: z.infer<typeof updateWalAddressSchema>
) => {
  try {
    const { walletAddress, userId, isSubmitted } =
      await updateWalAddressSchema.parseAsync(formData);
    const data = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        walletAddress,
        isSubmitted,
      },
    });
    return {
      success: true,
      message: "Wallet address updated successfully",
      data,
    };
  } catch (error) {
    console.log({ error });
    return {
      error: true,
      message: "Wallet address update failed",
    };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    if (!userId)
      return {
        error: true,
        message: "User ID is required",
      };
    const data = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return {
      success: true,
      message: "User deleted successfully",
      data,
    };
  } catch (error) {
    console.log({ error });
    return {
      error: true,
      message: "User delete failed",
    };
  }
};

export const updateUser = async (formData: UpdateUserArgs) => {
  try {
    const { userId, walletAddress, name, email, role, couponCode } =
      await updateUserSchema.partial().parseAsync(formData);
    const data = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        walletAddress,
        name,
        email,
        role,
        couponCode,
      },
    });
    return {
      success: true,
      message: "User updated successfully",
      data,
    };
  } catch (error) {
    console.log({ error });
    return {
      error: true,
      message: "User update failed",
    };
  }
};

/**
 *  Get all users Server Action
 * @param query
 * @param limit
 * @param cursor
 * @returns
 */
export const getUsers = async (query: string, limit: number, cursor: string) => {
  try {
    // Fetch users with the search query
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query, // Searching for 'name' containing the query
              mode: "insensitive", // Case insensitive search
            },
          },
          {
            email: {
              contains: query, // Searching for 'email' containing the query
              mode: "insensitive", // Case insensitive search
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        role: true,
        image: true,
        walletAddress: true,
        influencerId: true,
        email: true,
        couponCode: true,
        createdAt: true,
        tasks: {
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            tasks: true, // Get the count of tasks for each user
          },
        },
      },
      skip: cursor ? 1 : 0, // Skip the first user if there is a cursor
      take: limit, // Limit the number of users to fetch
      cursor: cursor ? { id: cursor } : undefined, // Use the cursor for pagination
      orderBy: {
        createdAt: "desc", // Order by creation date, most recent first
      },
    });

    // Map users to include taskCount
    const mappedUsers = users.map((user) => ({
      ...user,
      taskCount: user._count.tasks, // Add task count as taskCompleted
    }));

    // Determine the next cursor based on the fetched users
    const nextCursor = users.length === limit ? users[users.length - 1].id : null; // If the number of users is equal to the limit, we have more users to fetch

    // Get total user count for pagination
    const totalUsersCount = await prisma.user.count();

    // Return the users and pagination info
    return {
      users: mappedUsers,
      nextCursor,
      totalUsersCount,
    };
  } catch (error) {
    // Handle any errors during the fetch operation
    return {
      error: true,
      message: "Failed to fetch users",
    };
  }
};

export const signOutAction = async () => {
  try {
    await signOut();

    return {
      success: true,
      message: "User signed out successfully",
    };
  } catch (error) {
    console.log({ error });
    return {
      error: true,
      message: "User sign out failed",
    };
  }
};
