import { updatePartner } from "@/actions/partner-actions";
import { partnerFormSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
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
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
