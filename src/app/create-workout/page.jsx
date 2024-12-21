import CreateWorkoutForm from "@/components/CreateWorkoutForm";
import prisma from "@/lib/prisma";

export default async function CreateWorkoutPage() {
  const workoutCount = await prisma.workout.count();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-1">Create a new workout.</h1>
      <p className="text-sm text-muted-foreground mb-6">
        <span className="font-medium">{workoutCount}/50</span> rows used in
        workout table
      </p>
      <CreateWorkoutForm />
    </div>
  );
}
