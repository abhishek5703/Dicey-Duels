import { FaBookOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import clickSound from "../assets/sound/mouse_click.mp3"; // adjust path if needed

const Instructions = () => {
  const navigate = useNavigate();

  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  const handleBackHome = () => {
    playClickSound();
    navigate("/");
  };

  const handlePlayNow = () => {
    playClickSound();
    navigate("/game");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-2xl px-6 sm:px-10 py-10 text-gray-800">
      <div className="flex flex-col items-center text-center">
        <FaBookOpen className="text-5xl text-indigo-600 mb-4 animate-pulse" />
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">How to Play 🎲</h1>
      </div>

      <div className="space-y-5 text-lg leading-relaxed">
        <p>
          Welcome to <span className="font-semibold text-indigo-700">Dicey Duels</span> — a thrilling and fast-paced dice battle of risk and strategy!
        </p>

        <ol className="list-decimal list-inside space-y-3 pl-4">
          <li>
            🏠 <strong>Start:</strong> Select how many players will play (2 to 4) on the Home screen.
          </li>
          <li>
            📝 <strong>Enter:</strong> Each player adds their name on the name input screen.
          </li>
          <li>
            🔁 <strong>Take turns:</strong> On your turn, you can either <span className="font-semibold text-indigo-600">Roll</span> or <span className="font-semibold text-indigo-600">Hold</span>.
          </li>
          <li>
            🎲 <strong>If you Roll:</strong>
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
              <li>Rolling a 2–6 adds that number to your current score.</li>
              <li>Rolling a 1 resets your current score to <strong>0</strong> and ends your turn. 😖</li>
            </ul>
          </li>
          <li>
            🛑 <strong>If you Hold:</strong> Your current score is added to your total, and your turn ends.
          </li>
          <li>
            🎯 <strong>Goal:</strong> First player to reach <span className="font-bold text-purple-700">100 points</span> wins the game! 🏆
          </li>
        </ol>

        <p className="italic text-gray-600 mt-4 text-center">
          💡 Tip: Take risks, but don’t get too greedy!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <button
          onClick={handleBackHome}
          className="inline-block px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-full shadow hover:bg-gray-400 transition cursor-pointer"
        >
          ⬅ Back to Home
        </button>
        <button
          onClick={handlePlayNow}
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow hover:bg-indigo-700 transition cursor-pointer"
        >
          🎮 Play Now
        </button>
      </div>
    </div>
  );
};

export default Instructions;
