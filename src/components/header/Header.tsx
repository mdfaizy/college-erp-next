"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white w-9 h-9 flex items-center justify-center rounded-lg font-bold">
            ERP
          </div>
          <h1 className="font-bold text-lg text-gray-800">
            College ERP
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Right */}
        <div className="hidden md:flex gap-4">
          <Link href="/login" className="text-gray-600">
            Login
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(true)} className="md:hidden">
          <Menu />
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="absolute right-0 w-64 h-full bg-white p-6">
            <button onClick={() => setOpen(false)}>
              <X />
            </button>

            <div className="mt-6 flex flex-col gap-4">
              <Link href="/">Home</Link>
              <Link href="/features">Features</Link>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}