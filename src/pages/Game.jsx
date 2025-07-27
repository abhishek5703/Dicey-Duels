import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard";
import Dice from "../components/Dice";
import GameControls from "../components/GameControls";
import { FaRedo, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialPlayers = location.state?.players;

  const [players, setPlayers] = useState([]);
  const [turnScore, setTurnScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [showRolledOneMessage, setShowRolledOneMessage] = useState(false);


  useEffect(() => {
    if (!initialPlayers) {
      navigate("/names");
    } else {
      setPlayers(initialPlayers.map(p => ({ ...p, score: 0 })));
    }
  }, [initialPlayers, navigate]);

  // ⏱ Countdown logic
  useEffect(() => {
    if (gameOver || isRolling) return;

    if (timeLeft === 0) {
      setShowTimeoutMessage(true);
      setTurnScore(0);

      setTimeout(() => {
        setShowTimeoutMessage(false);
        nextPlayer();
        setTimeLeft(15);
      }, 2000);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameOver, isRolling]);

  const rollDice = () => {
    if (isRolling || gameOver) return;
    setIsRolling(true);

    const rollSequence = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 6) + 1
    );
    const finalRoll = Math.floor(Math.random() * 6) + 1;
    rollSequence.push(finalRoll);

    rollSequence.forEach((val, idx) => {
      setTimeout(() => {
        setDiceValue(val);
        if (idx === rollSequence.length - 1) {
          if (val === 1) {
            setTurnScore(0);
            setShowRolledOneMessage(true);
            setTimeout(() => {
              setShowRolledOneMessage(false);
              nextPlayer();
            }, 2000);
          } else {
            setTurnScore(prev => prev + val);
            setTimeLeft(15); // Reset only if not 1
          }
          setIsRolling(false);
        }
      }, idx * 100);
    });
  };

  const holdScore = () => {
    if (isRolling || gameOver) return;

    const updatedPlayers = [...players];
    updatedPlayers[currentPlayer].score += turnScore;
    setPlayers(updatedPlayers);
    setTurnScore(0);

    if (updatedPlayers[currentPlayer].score >= 100) {
      setGameOver(true);
    } else {
      nextPlayer();
    }

    setTimeLeft(15);
    setShowTimeoutMessage(false);
  };

  const nextPlayer = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
    setTimeLeft(15);
  };

  const resetGame = () => {
    const resetPlayers = players.map(p => ({ ...p, score: 0 }));
    setPlayers(resetPlayers);
    setTurnScore(0);
    setCurrentPlayer(0);
    setGameOver(false);
    setDiceValue(1);
    setTimeLeft(15);
    setShowTimeoutMessage(false);
  };

  return (
    <div>
      <img
        src="/dice-bg.svg"
        alt="Dice background"
        className="absolute opacity-10 top-0 left-0 w-full h-full object-cover pointer-events-none"
      />

      <motion.h1
        className="text-4xl font-extrabold text-center mb-8 text-blue-700 drop-shadow-sm"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🎲 Dicey Duels
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-8 mb-12 px-4">
        {players.map((player, index) => (
          <motion.div
            key={index}
            className="w-full sm:w-[300px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <PlayerCard
              player={player}
              isActive={index === currentPlayer}
              isWinner={gameOver && index === currentPlayer}
            />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mb-6">
        <Dice value={diceValue} isRolling={isRolling} />
      </div>

      {/* 🔢 Turn Score Display */}
      {turnScore > 0 && (
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl px-10 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.3)] text-center">
            {/* Gradient Border Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-red-400/50 via-yellow-300/50 to-cyan-300/40 blur-2xl opacity-30 pointer-events-none"></div>

            <h3 className="text-base font-bold text-cyan-200 tracking-widest uppercase drop-shadow-md">
              🎯 Turn Score
            </h3>
            <p className="text-6xl font-extrabold text-yellow-400 mt-2 drop-shadow-lg tracking-tight animate-pulse">
              {turnScore}
            </p>
          </div>
        </motion.div>
      )}



      {/* ⏱ Time Bar */}
      <div className="w-full max-w-md mx-auto mb-6 px-4">
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${timeLeft > 10 ? "bg-green-500" : timeLeft > 5 ? "bg-yellow-400" : "bg-red-500"
              }`}
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          ></div>
        </div>
        <p className="text-center mt-1 text-sm text-gray-700">⏱️ Time left: {timeLeft}s</p>
      </div>

      <GameControls
        turnScore={turnScore}
        currentPlayer={players[currentPlayer]?.name}
        rollDice={rollDice}
        holdScore={holdScore}
        gameOver={gameOver}
      />

      {/* 🎉 Game Win Message */}
      {gameOver && (
        <motion.div
          className="mt-8 text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h2 className="text-3xl font-bold text-green-600 animate-bounce">
            🎉 {players[currentPlayer].name} Wins!
          </h2>
        </motion.div>
      )}

      {/* ⏰  Timeout Popup */}
      {showTimeoutMessage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-red-600/20 text-white p-10 rounded-3xl border border-red-400/40 shadow-[0_8px_32px_0_rgba(255,0,0,0.35)] backdrop-blur-xl max-w-md w-[90%] text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white w-20 h-20 flex items-center justify-center rounded-full shadow-lg border-4 border-white/20 text-4xl animate-bounce">
              ⏰
            </div>

            <h2 className="mt-12 text-3xl font-bold text-red-200 mb-3 drop-shadow-lg">
              Time’s Up!
            </h2>
            <p className="text-lg text-red-100 mb-2">
              You ran out of time. Turn passed to the next player.
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* 😵 Rolled One Popup */}
      {showRolledOneMessage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-red-600/20 text-white p-10 rounded-3xl border border-red-400/40 shadow-[0_8px_32px_0_rgba(255,0,0,0.35)] backdrop-blur-xl max-w-md w-[90%] text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white w-20 h-20 flex items-center justify-center rounded-full shadow-lg border-4 border-white/20 text-4xl animate-bounce">
              🎲
            </div>

            <h2 className="mt-12 text-3xl font-bold text-red-200 mb-3 drop-shadow-lg">
              Oops! You rolled a 1
            </h2>
            <p className="text-lg text-red-100 mb-2">
              Your turn score is lost. Next player’s turn!
            </p>
          </motion.div>
        </motion.div>
      )}



      {/* 🔄 Control Buttons */}
      <motion.div
        className="mt-10 flex justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={resetGame}
          disabled={isRolling}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg shadow transition-all duration-300 disabled:opacity-50 cursor-pointer"
        >
          <FaRedo />
          Restart Game
        </button>
        <button
          onClick={() => navigate("/names")}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-300 cursor-pointer"
        >
          <FaHome />
          Home
        </button>
      </motion.div>
    </div>
  );
};

export default Game;
