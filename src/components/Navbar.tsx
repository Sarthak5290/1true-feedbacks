"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {

  Users,
  LayoutDashboard,
  LogOut,
  LogIn,
  MessageCircle,
  User,
} from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="border-b bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-white transition-colors"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              <span className="text-lg">Mystery Message</span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {session && (
              <div className="flex items-center mr-4 text-sm text-gray-300 font-bold">
                <User className="w-5 h-5 mr-2 text-gray-300" />
                <span className="text-lg">
                  {user?.username ? user.username : user?.email || ""}
                </span>
              </div>
            )}

            {session && (
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-lg font-bold text-gray-300 "
                >
                  <LayoutDashboard className="w-5 h-5 text-gray-300" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
            )}

            <Link href="/creators">
              <Button
                variant="outline"
                className="flex items-center space-x-2 text-lg font-bold text-black border-gray-600 hover:border-white"
              >
                <Users className="w-5 h-5 " />
                <span className="hidden sm:inline">Creators</span>
              </Button>
            </Link>

            {session ? (
              <Button
                onClick={() => signOut()}
                variant="destructive"
                className="flex items-center space-x-2 text-lg font-bold  hover:text-white"
              >
                <LogOut className="w-5 h-5 " />
                <span className="hidden sm:inline text-white">Logout</span>
              </Button>
            ) : (
              <Link href="/sign-in">
                <Button
                  variant="default"
                  className="flex items-center space-x-2 text-lg font-bold text-white"
                >
                  <LogIn className="w-5 h-5 text-white" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
