import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function Navbar() {
  const { userId } = await auth();
  const client = await clerkClient();
  if (userId) {
    const user = await client.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;

    // console.log(email);
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-slate-100">
      <Link href="/" className="text-2xl font-bold italic">
        Pumpa
      </Link>
      <div className="space-x-4">
        <SignedOut>
          <Button asChild variant="ghost">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-in">Log In</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button variant="ghost">
            <Link href="/create-exercise">new exercise</Link>
          </Button>
          <Button variant="ghost">
            <Link href="/create-workout">new workout</Link>
          </Button>
          <UserButton showName />
        </SignedIn>
      </div>
    </nav>
  );
}
