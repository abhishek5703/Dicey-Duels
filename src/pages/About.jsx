import { FaDice } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-2xl px-6 sm:px-10 py-10 text-gray-800"
    >
      <div className="flex flex-col items-center text-center">
        <FaDice className="text-5xl text-purple-600 mb-4 animate-bounce" />
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6">About Dicey Duels 🎲</h1>
      </div>

      <div className="space-y-5 text-lg leading-relaxed">
        <p>
          Welcome to <span className="font-bold text-purple-700">Dicey Duels</span> — a multiplayer dice game where <span className="text-indigo-600 font-semibold">strategy</span> meets <span className="text-indigo-600 font-semibold">luck</span>! Built entirely with <strong>React</strong>, this game supports 2 to 4 players in a fast-paced race to victory. 🏆
        </p>

        <p>
          🎯 <strong>Objective:</strong> Be the first to reach the target score. On your turn, either
          <span className="text-indigo-600 font-semibold"> roll the dice</span> to collect points or
          <span className="text-indigo-600 font-semibold"> hold</span> to bank them. But beware — rolling a 1 resets your turn score! 😬
        </p>

        <p>
          💻 <strong>Why I Built It:</strong> This project was crafted to strengthen core React skills like <span className="font-medium">component design</span>, <span className="font-medium">state management</span>, and <span className="font-medium">Framer Motion animations</span>. It’s the perfect mix of fun and learning!
        </p>

        <p className="italic text-center text-gray-600 pt-4">
          Made with ❤️ by <span className="font-semibold text-purple-700">Abhishek</span>
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <Link to="/instructions">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300">
            📖 View Instructions
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default About;
