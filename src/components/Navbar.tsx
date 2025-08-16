import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const linkClasses = (path: string) =>
    `px-3 py-2 rounded ${
      location.pathname === path
        ? 'bg-blue-500 text-white'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/dashboard" className={linkClasses('/dashboard')}>
          Dashboard
        </Link>
        <Link to="/portfolio" className={linkClasses('/portfolio')}>
          Portfolio
        </Link>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Crypto Portfolio Tracker
      </div>
    </nav>
  );
};

export default Navbar;
