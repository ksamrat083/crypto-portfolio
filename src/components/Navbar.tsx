// src/components/Navbar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toggleTheme } from "@/features/ui/uiSlice";

const Navbar: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);

  const linkClasses = (path: string) =>
    `px-3 py-2 rounded ${
      location.pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 p-4 flex justify-between items-center">
      {/* Left: Links */}
      <div className="flex gap-4">
        <Link to="/dashboard" className={linkClasses("/dashboard")}>
          Dashboard
        </Link>
        <Link to="/portfolio" className={linkClasses("/portfolio")}>
          Portfolio
        </Link>
      </div>

      {/* Right: Theme toggle + text */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Crypto Portfolio Tracker
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
