import { NextResponse } from "next/server";

import { createSoundRecommendation } from "@/lib/services/ai";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    genre?: string;
    environment?: string;
    batteryMode?: string;
    noiseLevel?: string;
  };

  return NextResponse.json(createSoundRecommendation(body));
}
