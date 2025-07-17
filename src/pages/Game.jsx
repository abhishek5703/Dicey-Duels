import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard";
import Dice from "../components/Dice";
import GameControls from "../components/GameControls";
import { FaRedo, FaHome } from "react-icons/fa";

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

  useEffect(() => {
    if (!initialPlayers) {
      navigate("/names");
    } else {
      setPlayers(initialPlayers);
    }
  }, [initialPlayers, navigate]);

  const rollDice = () => {
    if (isRolling || gameOver) return;
    setIsRolling(true);

    let rollTimes = 6;
    let rolls = [];
    for (let i = 0; i < rollTimes - 1; i++) {
      rolls.push(Math.floor(Math.random() * 6) + 1);
    }
    // Final roll determines actual outcome
    const finalRoll = Math.floor(Math.random() * 6) + 1;
    rolls.push(finalRoll);

    rolls.forEach((val, idx) => {
      setTimeout(() => {
        setDiceValue(val);
        if (idx === rolls.length - 1) {
          if (val === 1) {
            setTurnScore(0);
            nextPlayer();
          } else {
            setTurnScore((prev) => prev + val);
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

    if (updatedPlayers[currentPlayer].score >= 50) {
      setGameOver(true);
    } else {
      nextPlayer();
    }
  };

  const nextPlayer = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  };

  const resetGame = () => {
    const resetPlayers = players.map((p) => ({ ...p, score: 0 }));
    setPlayers(resetPlayers);
    setTurnScore(0);
    setCurrentPlayer(0);
    setGameOver(false);
    setDiceValue(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">🎲 Dicey Duels</h1>

      {/* Player Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            player={player}
            isActive={index === currentPlayer}
          />
        ))}
      </div>

      {/* Dice */}
      <div className="flex justify-center mb-8">
        <Dice value={diceValue} isRolling={isRolling} />
      </div>

      {/* Game Controls */}
      <GameControls
        turnScore={turnScore}
        currentPlayer={players[currentPlayer]?.name}
        rollDice={rollDice}
        holdScore={holdScore}
        gameOver={gameOver}
      />

      {/* Winner Banner */}
      {gameOver && (
        <div className="mt-6 text-center">
          <h2 className="text-3xl font-bold text-green-600 animate-bounce">
            🎉 {players[currentPlayer].name} Wins!
          </h2>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-8 flex gap-4 justify-center">
        <button
          onClick={resetGame}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          <FaRedo />
          Restart Game
        </button>
        <button
          onClick={() => navigate("/names")}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          <FaHome />
          Home
        </button>
      </div>
    </div>
  );
};

export default Game;
