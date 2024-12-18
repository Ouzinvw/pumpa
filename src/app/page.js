import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Workout Tracker</h1>
      <p className="text-xl mb-8">Track your fitness journey with ease</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/sign-in">Log In</Link>
        </Button>
      </div>
    </div>
  );
}
