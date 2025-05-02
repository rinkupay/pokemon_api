import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold flex items-center">
          {/* <span>🛍️</span> */}
          <span className="hidden lg:inline ml-2">Pokemon</span>
        </Link>

        {/* Search Bar */}
        {/* <div className="hidden lg:flex flex-grow mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-3xl px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div> */}

        <nav className="">
          <ul className="flex space-x-6 font-bold">
            <li>
              <Link to="/" className="hover:text-gray-200 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/lists" className="hover:text-gray-200 transition">
                Lists
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-gray-200 transition">
                Favorites
              </Link>
            </li>
            <li className="relative"></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
