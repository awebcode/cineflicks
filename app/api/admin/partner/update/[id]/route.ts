import { NextRequest, NextResponse } from "next/server";
import { partnerFormSchema } from "@/lib/schema"; // Adjust this import path as necessary
import { updatePartner } from "@/actions/partner-actions";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const partnerId = params.id;
    const body = await request.json();

    // Validate the request body
    const validatedData = partnerFormSchema.parse(body);

    const result = await updatePartner(partnerId, validatedData);

    if (result.error) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating partner:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
