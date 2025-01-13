import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { partnerFormSchema } from "@/lib/schema";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = partnerFormSchema.parse(json);

    const partner = await prisma.partner.create({
      data: body,
    });

    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
