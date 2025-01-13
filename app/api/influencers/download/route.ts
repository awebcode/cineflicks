// app/api/influencers/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust this to your prisma setup
import { Parser } from "json2csv";
import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Ensure you import the plugin

export const GET = async (req: Request) => {
  try {
    // Parse query parameters to determine the file format
    const url = new URL(req.url);
    const format = url.searchParams.get("format") || "csv";

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

    // Handle file generation based on the requested format
    switch (format) {
      case "csv": {
        // Convert influencers to CSV
        const json2csvParser = new Parser();
        const csvData = json2csvParser.parse(influencers);
        return new NextResponse(csvData, {
          headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": "attachment; filename=influencers.csv",
          },
        });
      }

      case "excel": {
        // Generate Excel file
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Influencers");
        sheet.columns = [
          { header: "ID", key: "id" },
          { header: "Name", key: "name" },
          { header: "Coupon Code", key: "couponCode" },
          { header: "Created At", key: "createdAt" },
          { header: "Expire Time", key: "expireTime" },
        ];
        influencers.forEach((influencer) => {
          sheet.addRow({
            id: influencer.id,
            name: influencer.name,
            couponCode: influencer.couponCode,
            createdAt: influencer.createdAt.toISOString(),
            expireTime: influencer.expireTime.toISOString(),
          });
          influencer.users.forEach((user) => {
            sheet.addRow({
              id: user.id,
              name: user.name,
              email: user.email,
              couponCode: "",
              createdAt: "",
              expireTime: "",
            });
          });
        });
        const buffer = await workbook.xlsx.writeBuffer();
        return new NextResponse(buffer, {
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": "attachment; filename=influencers.xlsx",
          },
        });
      }

      case "pdf": {
        // Generate PDF file
        const doc = new jsPDF();
        const tableColumn = ["ID", "Name", "Coupon Code", "Created At", "Expire Time"];
        const tableRows: string[][] = [];
        influencers.forEach((influencer) => {
          tableRows.push([
            influencer.id,
            influencer.name,
            influencer.couponCode,
            influencer.createdAt.toISOString(),
            influencer.expireTime.toISOString(),
          ]);
          influencer.users.forEach((user) => {
            tableRows.push([user.id, user.name, user.email, "", ""]);
          });
        });
        autoTable(doc, { head: [tableColumn], body: tableRows }); // Use the plugin here
        const pdfBuffer = doc.output("arraybuffer");
        return new NextResponse(Buffer.from(pdfBuffer), {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=influencers.pdf",
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
