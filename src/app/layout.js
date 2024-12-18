import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Navbar } from "../components/Navbar.jsx";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pumpa",
  description: "Create, track, crush your workouts and fitness progress",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
