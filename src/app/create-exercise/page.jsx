import CreateExerciseForm from "@/components/CreateExerciseForm";
import prisma from "@/lib/prisma";

export default async function CreateExercisePage() {
  const exerciseCount = await prisma.exercise.count();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-1">Create a new exercise.</h1>
      <p className="text-sm text-muted-foreground mb-6">
        <span className="font-medium">{exerciseCount}/50</span> rows used in
        exercise table
      </p>
      <CreateExerciseForm />
    </div>
  );
}
