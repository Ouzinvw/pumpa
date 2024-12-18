import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const exercise = await prisma.exercise.create({
        data: body,
      });
      return NextResponse.json(exercise, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { error: "Error creating exercise" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
