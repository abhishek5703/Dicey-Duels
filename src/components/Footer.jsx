import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Top Border Accent */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400" />

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Left Branding */}
        <div>
          <p className="text-lg font-semibold text-white">🎲 Dicey Duels</p>
          <p className="text-sm text-gray-400">Crafted with <FaHeart className="inline text-red-500 mx-1" /> by Abhishek</p>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-5">
          <a
            href="https://github.com/abhishek5703"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/abhishekkumar8983/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
