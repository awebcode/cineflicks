// app/api/influencers/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust this to your prisma setup
import { Parser } from "json2csv";

export const GET = async () => {
  try {
    // Fetch influencers from the database using Prisma
    const influencers = await prisma.influencer.findMany({
      select: {
        id: true,
        name: true,
        couponCode: true,
        createdAt: true,
        expireTime: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // If no influencers found
    if (influencers.length === 0) {
      return NextResponse.json({ message: "No influencers found" }, { status: 404 });
    }

    // Convert the data to CSV format
    const json2csvParser = new Parser();
    const csvData = json2csvParser.parse(influencers);

    // Set up the response for downloading the CSV file
    return new NextResponse(csvData, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=influencers.csv",
      },
    });
  } catch (error) {
    console.error("Error generating CSV:", error);
    return NextResponse.json({ message: "Failed to generate CSV" }, { status: 500 });
  }
};
