"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignedOut,
  SignedIn,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const logoRef = userId ? "/dashboard" : "/";

  useEffect(() => {
    if (isLoaded && user) {
      const adminList = ["ouzinvw@live.com", "ouzinvw@gmail.com"];
      const userEmail = user.emailAddresses[0]?.emailAddress;
      setIsAdmin(adminList.includes(userEmail));
    }
  }, [isLoaded, user]);

  const publicLinks = [
    { href: "/become-member", label: "✨ Membership ✨" },
    { href: "/browse-workouts", label: "Browse Workouts" },
    { href: "/dashboard", label: "View Progress" },
    { href: "/get-assistance", label: "Get Assistance" },
  ];

  const adminLinks = [
    { href: "/create-exercise", label: "New Exercise 🥷" },
    { href: "/create-workout", label: "New Workout 🥷" },
  ];

  return (
    <nav className="flex justify-between items-center p-4 bg-slate-100">
      <Link href={logoRef} className="text-2xl font-bold italic text-black">
        Pumpa🦾
      </Link>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {publicLinks.map((link) => (
              <DropdownMenuItem key={link.href} asChild>
                <Link href={link.href}>{link.label}</Link>
              </DropdownMenuItem>
            ))}
            <SignedIn>
              {isAdmin && (
                <>
                  {adminLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </>
              )}
            </SignedIn>
            <SignedOut>
              <DropdownMenuItem asChild>
                <Link href="/sign-up">Sign Up</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/sign-in">Log In</Link>
              </DropdownMenuItem>
            </SignedOut>
          </DropdownMenuContent>
        </DropdownMenu>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
