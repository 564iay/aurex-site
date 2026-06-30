import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { configurationSchema } from "@/lib/zod";
import { computeBuildPrice } from "@/lib/services/pricing";

export async function POST(request: Request) {
  const configuration = configurationSchema.parse(await request.json());
  const price = computeBuildPrice({
    edition: configuration.edition,
    frameFinish: configuration.frameFinish,
    accessories: configuration.accessories
  });

  return NextResponse.json({
    id: randomUUID(),
    slug: `custom-${randomUUID().slice(0, 8)}`,
    configuration,
    price
  });
}
