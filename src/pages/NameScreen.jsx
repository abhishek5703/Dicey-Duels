import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NameScreen = () => {
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleStartGame = () => {
    const players = playerNames
      .slice(0, playerCount)
      .map((name) => ({ name, score: 0 }));
    navigate("/game", { state: { players } });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-12  gap-8 md:gap-16">
      {/* Left: Game Setup Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full md:w-1/2 max-w-xl"
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          🎮 Set Up Your Game
        </h2>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Number of Players
          </label>
          <select
            value={playerCount}
            onChange={(e) => setPlayerCount(Number(e.target.value))}
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 cursor-pointer"
          >
            {[2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} Players
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 mb-6">
          {[...Array(playerCount)].map((_, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Player ${index + 1} Name`}
              className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 cursor-pointer"
              value={playerNames[index]}
              onChange={(e) => {
                const names = [...playerNames];
                names[index] = e.target.value;
                setPlayerNames(names);
              }}
              required
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStartGame}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:from-teal-500 hover:to-green-500 transition duration-300 cursor-pointer"
        >
          🚀 Start Game
        </motion.button>
      </motion.div>

      {/* Right: Illustration */}
      <motion.img
        src="/name.png"
        alt="Dicey Duels Illustration"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[260px] sm:w-[340px] md:w-[400px] drop-shadow-xl"
      />
    </div>
  );
};

export default NameScreen;
