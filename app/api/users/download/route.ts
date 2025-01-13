import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust the import path for your Prisma setup
import { Parser } from "json2csv";
import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Ensure you import the plugin

export const GET = async (req: Request) => {
  try {
    // Parse query parameters to determine the file format
    const url = new URL(req.url);
    const format = url.searchParams.get("format") || "csv";

    // Fetch user data from the database
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

    // If no users are found, return a 404 response
    if (users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    // Handle file generation based on the requested format
    switch (format) {
      case "csv": {
        // Convert users to CSV
        const json2csvParser = new Parser();
        const csvData = json2csvParser.parse(users);
        return new NextResponse(csvData, {
          headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": "attachment; filename=users.csv",
          },
        });
      }

      case "excel": {
        // Generate Excel file
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Users");
        sheet.columns = [
          { header: "ID", key: "id" },
          { header: "Name", key: "name" },
          { header: "Email", key: "email" },
          { header: "Coupon Code", key: "couponCode" },
          { header: "Wallet Address", key: "walletAddress" },
          { header: "Created At", key: "createdAt" },
        ];
        sheet.addRows(
          users.map((user) => ({
            ...user,
            createdAt: user.createdAt.toISOString(),
          }))
        );
        const buffer = await workbook.xlsx.writeBuffer();
        return new NextResponse(buffer, {
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": "attachment; filename=users.xlsx",
          },
        });
      }

      case "pdf": {
        // Generate PDF file
        const doc = new jsPDF();
        const tableColumn = [
          "ID",
          "Name",
          "Email",
          "Coupon Code",
          "Wallet Address",
          "Created At",
        ];
        const tableRows = users.map((user) => [
          user.id,
          user.name,
          user.email,
          user.couponCode,
          user.walletAddress,
          user.createdAt.toISOString(),
        ]);
        autoTable(doc, { head: [tableColumn], body: tableRows }); // Use the plugin here
        const pdfBuffer = doc.output("arraybuffer");
        return new NextResponse(Buffer.from(pdfBuffer), {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=users.pdf",
          },
        });
      }

      default:
        // Handle unsupported formats
        return NextResponse.json({ message: "Unsupported format" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error generating file:", error);
    return NextResponse.json({ message: "Failed to generate file" }, { status: 500 });
  }
};
