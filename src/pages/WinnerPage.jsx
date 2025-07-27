// src/pages/WinnerPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { FaRedo, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";

const WinnerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.players;

  useEffect(() => {
    if (!results) navigate("/");
  }, [results, navigate]);

  const sortedPlayers = [...(results || [])].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white px-4 py-12 flex flex-col items-center">
      {/* 🎉 Celebration Confetti */}
      <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} />

      <motion.h1
        className="text-5xl font-extrabold text-yellow-300 drop-shadow-xl text-center mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🎉 {winner?.name} Wins the Game!
      </motion.h1>

      <motion.div
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-cyan-200 mb-4">🏆 Final Rankings</h2>
        <ol className="space-y-3">
          {sortedPlayers.map((player, idx) => (
            <li
              key={idx}
              className={`flex justify-between p-4 rounded-xl ${idx === 0
                ? "bg-yellow-500 text-black font-bold"
                : idx === 1
                  ? "bg-gray-300 text-black"
                  : idx === 2
                    ? "bg-orange-300 text-black"
                    : "bg-white/10 text-white border border-white/20"}`}
            >
              <span>{idx + 1}. {player.name}</span>
              <span>{player.score} pts</span>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* 🔄 Buttons */}
      <div className="mt-10 flex gap-6">
        <button
          onClick={() => navigate("/names")}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-300 cursor-pointer"
        >
          <FaHome /> Home
        </button>
        <button
          onClick={() => navigate("/game", { state: { players: results } })}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg shadow transition-all duration-300 cursor-pointer"
        >
          <FaRedo /> Restart
        </button>
      </div>
    </div>
  );
};

export default WinnerPage;
