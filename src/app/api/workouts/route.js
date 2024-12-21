import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const userId = body.userId || "placeholder-user-id";

    const workout = await prisma.workout.create({
      data: {
        name: body.name,
        description: body.description,
        difficulty: body.difficulty,
        isPrivate: body.isPrivate,
        duration: body.duration,
        breakTime: body.breakTime,
        createdByUser: userId,
        likes: 0,
        exercises: {
          create: body.exercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            reps: exercise.reps,
            time: exercise.time,
          })),
        },
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    return NextResponse.json(workout, { status: 201 });
  } catch (error) {
    console.error("Error creating workout:", error);
    return NextResponse.json(
      { error: "Error creating workout" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const workouts = await prisma.workout.findMany({
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });
    return NextResponse.json(workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return NextResponse.json(
      { error: "Error fetching workouts" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, exercises, ...data } = body;

    const workout = await prisma.workout.update({
      where: { id },
      data: {
        ...data,
        exercises: {
          deleteMany: {},
          create: exercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            reps: exercise.reps,
            time: exercise.time,
          })),
        },
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    return NextResponse.json(workout);
  } catch (error) {
    console.error("Error updating workout:", error);
    return NextResponse.json(
      { error: "Error updating workout" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await prisma.workout.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting workout:", error);
    return NextResponse.json(
      { error: "Error deleting workout" },
      { status: 500 }
    );
  }
}
