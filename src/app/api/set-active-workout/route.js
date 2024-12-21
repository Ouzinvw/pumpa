import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { userId, workoutId } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        activeWorkoutId: workoutId,
      },
      include: {
        activeWorkout: true,
      },
    });

    return NextResponse.json(updatedUser.activeWorkout);
  } catch (error) {
    console.error("Error setting active workout:", error);
    return NextResponse.json(
      { error: "Error setting active workout" },
      { status: 500 }
    );
  }
}
