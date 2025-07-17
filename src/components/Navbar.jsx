import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icon library

const Navbar = ({ playerStats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const linkClasses = (path) =>
    `block px-4 py-2 rounded transition ${location.pathname === path
      ? "bg-white text-indigo-700 font-semibold"
      : "hover:bg-indigo-600 hover:text-white"
    }`;

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-indigo-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Branding */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 via-white to-pink-300 text-transparent bg-clip-text drop-shadow-sm"
        >
          🎲 Dicey Duels
        </Link>

        {/* Desktop Links */}
        <div className="space-x-4 hidden sm:flex">
          <Link to="/" className={linkClasses("/")}>
            Home
          </Link>
          <Link to="/game" className={linkClasses("/game")}>
            Game
          </Link>
          <Link to="/instructions" className={linkClasses("/instructions")}>
            Instructions
          </Link>
          <Link to="/about" className={linkClasses("/about")}>
            About
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={toggleDrawer}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-3 space-y-2">
          <Link to="/" onClick={toggleDrawer} className={linkClasses("/")}>
            Home
          </Link>
          <Link to="/game" onClick={toggleDrawer} className={linkClasses("/game")}>
            Game
          </Link>
          <Link to="/instructions" onClick={toggleDrawer} className={linkClasses("/instructions")}>
            Instructions
          </Link>
        </div>
      )}

      {/* Optional Game Status */}
      {playerStats && (
        <div className="bg-indigo-600 text-sm py-2 text-center font-medium">
          {playerStats.map((p, i) => (
            <span key={i} className="mx-2">
              {p.name}: {p.score}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
