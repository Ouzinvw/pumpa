import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { workoutId, userId, action } = await req.json();

    if (action === "save") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          savedWorkouts: {
            connect: { id: workoutId },
          },
        },
      });
    } else if (action === "unsave") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          savedWorkouts: {
            disconnect: { id: workoutId },
          },
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving/unsaving workout:", error);
    return NextResponse.json(
      { error: "Error saving/unsaving workout" },
      { status: 500 }
    );
  }
}
