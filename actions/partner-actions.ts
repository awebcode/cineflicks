"use server";
import { prisma } from "@/lib/prisma"; // Import Prisma client

export const getPartners = async (query: string, limit: number, cursor: string) => {
  try {
    const partners = await prisma.partner.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive", // Case insensitive search
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive", // Case insensitive search
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        link: true, // Include the link field
        photoUrl: true,
        videoUrl: true,
        createdAt: true,
      },
      skip: cursor ? 1 : 0,
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalPartnersCount = await prisma.partner.count();
    const nextCursor =
      partners.length === limit ? partners[partners.length - 1].id : null;

    return {
      partners,
      totalPartnersCount,
      nextCursor,
    };
  } catch (error) {
    console.error("Failed to fetch partners:", error);
    return {
      error: true,
      message: "Failed to fetch partners",
    };
  }
};

/**
 * Delete Partner
 * @param partnerId
 */
export const deletePartner = async (partnerId: string) => {
  try {
    if (!partnerId) {
      return {
        error: true,
        message: "Partner ID is required",
      };
    }
    const data = await prisma.partner.delete({
      where: {
        id: partnerId,
      },
    });
    return {
      success: true,
      message: "Partner deleted successfully",
      data,
    };
  } catch (error) {
    console.error("Failed to delete partner:", error);
    return {
      error: true,
      message: "Failed to delete partner",
    };
  }
};

/**
 * Update Partner
 * @param partnerId
 * @param data
 */
export const updatePartner = async (
  partnerId: string,
  data: {
    title?: string;
    description?: string;
    link?: string;
    photoUrl?: string;
    videoUrl?: string;
  }
) => {
  try {
    if (!partnerId) {
      return {
        error: true,
        message: "Partner ID is required",
      };
    }

    const updatedPartner = await prisma.partner.update({
      where: {
        id: partnerId,
      },
      data,
    });

    return {
      success: true,
      message: "Partner updated successfully",
      data: updatedPartner,
    };
  } catch (error) {
    console.error("Failed to update partner:", error);
    return {
      error: true,
      message: "Failed to update partner",
    };
  }
};
