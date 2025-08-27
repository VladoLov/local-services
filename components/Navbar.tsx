"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuClick = () => setIsOpen(!isOpen);
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
            <li>
              <Link
                href="#"
                className="block lg:inline-block py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Sign Up Business
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
