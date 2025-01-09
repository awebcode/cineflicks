// app/api/users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust this to your prisma setup
import { Parser } from "json2csv";

export const GET = async () => {
  try {
    // Fetch users from the database using Prisma
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        couponCode: true,
        walletAddress: true,
        createdAt: true,
      },
    });

    // If no users found
    if (users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    // Convert the data to CSV format
    const json2csvParser = new Parser();
    const csvData = json2csvParser.parse(users);

    // Set up the response for downloading the CSV file
    return new NextResponse(csvData, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=users.csv",
      },
    });
  } catch (error) {
    console.error("Error generating CSV:", error);
    return NextResponse.json({ message: "Failed to generate CSV" }, { status: 500 });
  }
};
