import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SaveWorkoutButton from "./components/SaveWorkoutButton";

const difficultyColors = {
  Beginner: "bg-sky-400",
  Easy: "bg-green-400",
  Medium: "bg-amber-400",
  Hard: "bg-red-600",
  Godly: "bg-rose-600 italic",
};

async function getWorkouts(userId) {
  try {
    const workouts = await prisma.workout.findMany({
      include: {
        exercises: true,
        savedByUsers: {
          where: {
            id: userId,
          },
        },
      },
    });
    return workouts.map((workout) => ({
      ...workout,
      isSaved: workout.savedByUsers.length > 0,
    }));
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
    return null;
  }
}

function WorkoutsTable({ workouts, userId }) {
  if (!workouts || workouts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>No workouts found. Try creating some workouts first!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Duration (mins)</TableHead>
            <TableHead>Exercises</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workouts.map((workout) => (
            <TableRow
              key={workout.id}
              className="transition-colors hover:bg-gray-100"
            >
              <TableCell className="font-medium">{workout.name}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    difficultyColors[workout.difficulty]
                  } text-white`}
                >
                  {workout.difficulty}
                </Badge>
              </TableCell>
              <TableCell>{workout.duration}</TableCell>
              <TableCell>{workout.exercises.length}</TableCell>
              <TableCell>
                <SaveWorkoutButton
                  workoutId={workout.id}
                  isSaved={workout.isSaved}
                  userId={userId}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function LoadingState() {
  return (
    <Card>
      <CardContent className="p-6">
        <p>Loading workouts...</p>
      </CardContent>
    </Card>
  );
}

export default async function BrowseWorkoutsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const workouts = await getWorkouts(user.id);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Browse Workouts</h1>
      <Suspense fallback={<LoadingState />}>
        <WorkoutsTable workouts={workouts} userId={user.id} />
      </Suspense>
    </div>
  );
}
