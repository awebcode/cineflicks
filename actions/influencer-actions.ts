"use server";
import { influencerSchema, type InfluencerUpdateArgs } from "@/lib/influencer-schema";
import { prisma } from "@/lib/prisma"; // Import Prisma client

// Function to create an influencer
export async function createInfluencer(username: string, days = 1,image:string) {
  // Ensure couponCode is the same as the username
  const couponCode = username.toUpperCase().replace(/\s+/g, "-");

  // Check if the couponCode already exists
  const existingInfluencer = await prisma.influencer.findUnique({
    where: { couponCode },
  });

  if (existingInfluencer) {
    return {
      error: true,
      message: "Coupon code already exists",
    };
  }

  const expireTime = new Date(Date.now() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds

  const influencer = await prisma.influencer.create({
    data: {
      name: username, // You can still store the username as the name if required
      couponCode, // The coupon code will be the same as the username
      expireTime,
      image
    },
  });

  return influencer;
}

// Function to assign a coupon to a user
export async function assignCouponToUser(userId: string, influencerId: string) {
  // Get influencer coupon code
  const influencer = await prisma.influencer.findUnique({
    where: { id: influencerId },
  });

  if (!influencer) {
    return {
      error: true,
      message: "Influencer not found",
    };
  }

  // Assign coupon code to user
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      couponCode: influencer.couponCode, // Assign the coupon code
    },
  });

  // Track coupon usage
  const usage = await prisma.couponUsage.create({
    data: {
      userId,
      influencerId,
    },
  });

  return { updatedUser, usage };
}

// // Example of using it
// async function example() {
//   // Create an influencer
//   const influencer = await createInfluencer("John Doe");

//   // Assign a coupon to a user and track usage
//   const userId = "some-user-id"; // Replace with a real user ID
//   const { updatedUser, usage } = await assignCouponToUser(userId, influencer.id);

//   console.log(updatedUser, usage);
// }

// example();
/**
 *  Get all influencers Server Action
 * @param query
 * @param limit
 * @param cursor
 * @returns
 */
export const getInfluencers = async (query: string, limit: number, cursor: string) => {
  // Fetch influencers with the search query

  try {
    const influencers = await prisma.influencer.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query, // Searching for 'name' containing the query
              mode: "insensitive", // Case insensitive search
            },
          },
          {
            couponCode: {
              contains: query, // Searching for 'couponCode' containing the query
              mode: "insensitive", // Case insensitive search
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        couponCode: true,
        image: true,
        expireTime: true,
        users: {
          select: {
            id: true, // Just fetch user IDs for counting purposes
          },
        },
      },
      skip: cursor ? 1 : 0,
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map the influencers to include the user count
    const influencersWithUserCount = influencers.map((influencer) => ({
      id: influencer.id,
      name: influencer.name,
      couponCode: influencer.couponCode,
      image: influencer.image,
      expireTime: influencer.expireTime,
      totalUsers: influencer.users.length, // Calculate the number of users
    }));
    const totalInfluencersCount = await prisma.influencer.count();
    const nextCursor =
      influencersWithUserCount.length === limit
        ? influencersWithUserCount[influencersWithUserCount.length - 1].id
        : null;
    return {
      influencers: influencersWithUserCount,
      totalInfluencersCount,
      nextCursor,
    };
  } catch (error) {
    return {
      error: true,
      message: "Failed to fetch influencers",
    };
  }
};

/**
 * Delete Influencer
 */

export const deleteInfluencer = async (influencerId: string) => {
  try {
    if (!influencerId)
      return {
        error: true,
        message: "Influencer ID is required",
      };
    const data = await prisma.influencer.delete({
      where: {
        id: influencerId,
      },
    });
    return {
      success: true,
      message: "Influencer deleted successfully",
      data,
    };
  } catch (error) {
    console.log({ error });
    return {
      error: true,
      message: "Influencer delete failed",
    };
  }
};

/**
 * Update Influencer
 * @param influencerId
 * @param data
 */
export const updateInfluencer = async (
  influencerId: string,
  data: Partial<InfluencerUpdateArgs>
) => {
  try {
    const { couponCode, image, expireTime, name } = data;

    // Ensure influencerId and required fields are provided
    if (!influencerId) {
      return {
        error: true,
        message: "Influencer ID is required",
      };
    }

    // Ensure name and couponCode are provided
    if (!name || !couponCode) {
      return {
        error: true,
        message: "Name and Coupon Code are required fields",
      };
    }

    // Handle expireTime logic
    let expireDate: Date=expireTime as any
    if (expireTime) {
      const days = parseInt(expireTime.toString(), 10); // Parse expireTime as integer
      if (!isNaN(days) && days > 0) {
        expireDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
      } else {
        return {
          error: true,
          message: "Expire time must be a positive number",
        };
      }
    }

    // Update the influencer in the database
    const influencer = await prisma.influencer.update({
      where: {
        id: influencerId,
      },
      data: {
        name,
        couponCode,
        image,
        expireTime: expireDate, // Only update expireTime if valid
      },
    });

    return {
      success: true,
      message: "Influencer updated successfully",
      data: influencer,
    };
  } catch (error) {
    // Log error in a more structured way
    if (error instanceof Error) {
      console.error("Error updating influencer:", error.message);
      console.error(error.stack);
    } else {
      console.error("Unknown error occurred:", error);
    }

    return {
      error: true,
      message: "Influencer update failed",
    };
  }
};
