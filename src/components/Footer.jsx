import { FaGithub, FaLinkedin, FaHeart, FaDice } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-20 bg-black text-gray-200 relative">
      {/* Gradient Border */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            <FaDice className="text-purple-400" />
            Dicey Duels
          </h2>
          <p className="text-sm mt-1">
            Crafted with <FaHeart className="inline text-red-500 mx-1 animate-pulse" /> by Abhishek Kumar
          </p>
          <p className="text-xs text-gray-400 mt-1">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/abhishek5703"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300 hover:scale-110"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/abhishekkumar8983/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#0A66C2] transition duration-300 hover:scale-110"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
