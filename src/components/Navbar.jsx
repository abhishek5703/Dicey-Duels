import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ playerStats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

 const linkClasses = (path) =>
  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
    location.pathname === path
      ? "bg-white text-indigo-700 shadow font-semibold"
      : "text-white hover:bg-white hover:text-indigo-700"
  }`;


  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Dicey Duels Logo"
            className="h-11 w-11 rounded-xl shadow-md transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
          />
          <span className="text-white text-2xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-300 via-white to-pink-300 bg-clip-text text-transparent drop-shadow hidden sm:inline">
            Dicey Duels
          </span>
        </Link>


        {/* Desktop Links */}
        <div className="space-x-4 hidden sm:flex">
          <Link to="/" className={linkClasses("/")}>Home</Link>
          <Link to="/game" className={linkClasses("/game")}>Game</Link>
          <Link to="/instructions" className={linkClasses("/instructions")}>Instructions</Link>
          <Link to="/about" className={linkClasses("/about")}>About</Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={toggleDrawer}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="sm:hidden bg-white/20 backdrop-blur-md mx-4 mt-2 mb-4 rounded-xl px-4 py-4 space-y-2 transition-all duration-300">
          <Link to="/" onClick={toggleDrawer} className={linkClasses("/")}>Home</Link>
          <Link to="/game" onClick={toggleDrawer} className={linkClasses("/game")}>Game</Link>
          <Link to="/instructions" onClick={toggleDrawer} className={linkClasses("/instructions")}>Instructions</Link>
          <Link to="/about" onClick={toggleDrawer} className={linkClasses("/about")}>About</Link>
        </div>
      )}

      {/* Player Stats */}
      {playerStats && (
        <div className="bg-indigo-600 text-sm py-2 text-center text-white font-medium shadow-inner">
          {playerStats.map((p, i) => (
            <span key={i} className="mx-2">
              🎲 {p.name}: {p.score}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
