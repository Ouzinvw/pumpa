import CreateExerciseForm from "@/components/CreateExerciseForm";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function CreateExercisePage() {
  const { userId } = await auth();

  if (!userId || userId != "user_2qMKf5Wnbqum6yGLmVejD25GtOq") {
    redirect("/");
  }
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create Exercise</h1>
      <CreateExerciseForm />
    </div>
  );
}
