"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Users,
  LayoutDashboard,
  LogOut,
  LogIn,
  MessageCircle,
  User,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold text-white transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <span>Mystery Message</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {session && (
              <div className="flex items-center text-sm text-gray-300 font-bold">
                <User className="w-5 h-5 mr-2 text-gray-300" />
                <span>{user?.username || user?.email || ""}</span>
              </div>
            )}

            {session && (
              <Link href="/dashboard">
                <Button variant="ghost" className="text-gray-300">
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
            )}

            <Link href="/creators">
              <Button variant="outline" className="border-gray-600 text-white">
                <Users className="w-5 h-5" />
                <span className="hidden sm:inline">Creators</span>
              </Button>
            </Link>

            {session ? (
              <Button onClick={() => signOut()} variant="destructive">
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            ) : (
              <Link href="/sign-in">
                <Button variant="default" className="text-white">
                  <LogIn className="w-5 h-5" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 py-4 space-y-4">
            {session && (
              <div className="flex items-center text-sm text-gray-300 font-bold px-4">
                <User className="w-5 h-5 mr-2 text-gray-300" />
                <span>{user?.username || user?.email || ""}</span>
              </div>
            )}

            {session && (
              <Link href="/dashboard" className="block px-4 py-2 text-white">
                <LayoutDashboard className="w-5 h-5 inline-block mr-2" />
                Dashboard
              </Link>
            )}

            <Link href="/creators" className="block px-4 py-2 text-white">
              <Users className="w-5 h-5 inline-block mr-2" />
              Creators
            </Link>

            {session ? (
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 text-white"
              >
                <LogOut className="w-5 h-5 inline-block mr-2" />
                Logout
              </button>
            ) : (
              <Link href="/sign-in" className="block px-4 py-2 text-white">
                <LogIn className="w-5 h-5 inline-block mr-2" />
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
