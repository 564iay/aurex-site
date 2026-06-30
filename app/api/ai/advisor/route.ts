import { NextResponse } from "next/server";

import { createAdvisorAnswer } from "@/lib/services/ai";

export async function POST(request: Request) {
  const { question } = (await request.json()) as { question?: string };

  return NextResponse.json(createAdvisorAnswer(question ?? ""));
}
