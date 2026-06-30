import { NextResponse } from "next/server";

import { redis } from "@/lib/redis";

const memoryCarts = new Map<string, unknown>();

export async function POST(request: Request) {
  const body = await request.json();
  const token = body.token ?? crypto.randomUUID();

  if (redis) {
    await redis.set(`cart:${token}`, body, { ex: 60 * 60 * 24 * 14 });
  } else {
    memoryCarts.set(token, body);
  }

  return NextResponse.json({ token, saved: true });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Missing cart token." }, { status: 400 });
  }

  const cart = redis ? await redis.get(`cart:${token}`) : memoryCarts.get(token);
  return NextResponse.json({ token, cart });
}
