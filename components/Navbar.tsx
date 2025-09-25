"use client";

/* import { authClient } from "@/lib/auth-client"; */
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/server";

import { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

export default function Navbar({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const handleMenuClick = () => setIsOpen(!isOpen);
  /* const { data: session, isPending, refetch } = authClient.useSession(); */

  /* const signOut = authClient.signOut; */
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();

    router.push("/"); // Refresh the page to update the UI after sign-out
  };

  // Use useEffect to handle session changes and force re-render
  /*     useEffect(() => {
    if (session === true) {
      setIsLoading(true); // Wait until session status is fully loaded
    } else if ( === false) {
      setIsLoading(false); // Session has been determined
    }
  }, [isPending]); // This hook tracks the session status changes */

  // This ensures the UI is always in sync with the session state
  /* useEffect(() => {
    if (session) {
      console.log("User logged in:", session.user);
    } else {
      console.log("User logged out.");
    }
  }, [session]); // Only rerender when session changes */

  /*  if (isLoading) return null; */
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Site Logo/Name */}
        <Link
          href="/"
          className="text-xl font-bold rounded-lg px-2 py-1 hover:bg-gray-800 transition-colors duration-300"
        >
          Majstor Zanata
        </Link>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          onClick={handleMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Toggle navigation menu"
        >
          {/* Hamburger icon (or 'X' if menu is open) */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-16 6h16"
              />
            )}
          </svg>
        </button>

        {/* Main Navigation Links */}
        {/* Conditionally hide/show based on `isOpen` state on mobile,
            but always show on large screens (`lg:flex`) */}
        <div
          className={`
            ${isOpen ? "block" : "hidden"} 
            absolute top-16 left-0 w-full bg-gray-900 p-4 
            lg:static lg:flex lg:w-auto lg:flex-row lg:space-x-4 lg:items-center lg:p-0
            transition-all duration-300 ease-in-out z-10
          `}
        >
          {/* Links list */}
          <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 text-sm font-medium">
            <li>
              <Link
                href="/"
                className="block lg:inline-block py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="block lg:inline-block py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Usluge
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block lg:inline-block py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                About
              </Link>
            </li>
            {session ? (
              <li>
                <Link
                  href="/addservice"
                  className="block lg:inline-block py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                >
                  Dodaj Uslugu
                </Link>
              </li>
            ) : null}
            <li>
              {session ? (
                <Button
                  /*    onClick={handleSignOut} */
                  /*  onClick={() => {
                    signOut();
                   
                    router.refresh(); // Redirect to home after sign-out
                  }} */
                  onClick={handleSignOut}
                  className="block lg:inline-block py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                >
                  Logout
                </Button>
              ) : (
                <Button className="block lg:inline-block py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                  <Link href="/auth/signin">Login</Link>
                </Button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
