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

    // Fetch partner data from the database
    const partners = await prisma.partner.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        link: true,
        photoUrl: true,
        videoUrl: true,
        createdAt: true,
      },
    });

    // If no partners are found, return a 404 response
    if (partners.length === 0) {
      return NextResponse.json({ message: "No partners found" }, { status: 404 });
    }

    // Handle file generation based on the requested format
    switch (format) {
      case "csv": {
        // Convert partners to CSV
        const json2csvParser = new Parser();
        const csvData = json2csvParser.parse(partners);
        return new NextResponse(csvData, {
          headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": "attachment; filename=partners.csv",
          },
        });
      }

      case "excel": {
        // Generate Excel file
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Partners");
        sheet.columns = [
          { header: "ID", key: "id" },
          { header: "Title", key: "title" },
          { header: "Description", key: "description" },
          { header: "Link", key: "link" },
          { header: "Photo URL", key: "photoUrl" },
          { header: "Video URL", key: "videoUrl" },
          { header: "Created At", key: "createdAt" },
        ];
        sheet.addRows(
          partners.map((partner) => ({
            ...partner,
            createdAt: partner.createdAt.toISOString(),
          }))
        );
        const buffer = await workbook.xlsx.writeBuffer();
        return new NextResponse(buffer, {
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": "attachment; filename=partners.xlsx",
          },
        });
      }

      case "pdf": {
        // Generate PDF file
        const doc = new jsPDF();
        const tableColumn = [
          "ID",
          "Title",
          "Description",
          "Link",
          "Photo URL",
          "Video URL",
          "Created At",
        ];
        const tableRows = partners.map((partner) => [
          partner.id,
          partner.title,
          partner.description,
          partner.link,
          partner.photoUrl,
          partner.videoUrl,
          partner.createdAt.toISOString(),
        ]);
        autoTable(doc, { head: [tableColumn], body: tableRows }); // Use the plugin here
        const pdfBuffer = doc.output("arraybuffer");
        return new NextResponse(Buffer.from(pdfBuffer), {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=partners.pdf",
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
