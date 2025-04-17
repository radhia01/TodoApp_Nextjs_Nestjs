"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function Navbar() {
  const router = useRouter();
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-indigo-600 text-2xl font-bold">
          Planify
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-black transition "
            >
              Disconnect
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-black transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-black transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden rounded bg-gray-100 p-2 text-gray-600 hover:text-gray-800 transition"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col gap-2">
            {token ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-black transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-black transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-black transition"
                >
                  SignUp
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
