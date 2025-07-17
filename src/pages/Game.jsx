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
      setPlayers(initialPlayers.map(p => ({ ...p, score: 0 })));
    }
  }, [initialPlayers, navigate]);

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
            nextPlayer();
          } else {
            setTurnScore(prev => prev + val);
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
  };

  const nextPlayer = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  };

  const resetGame = () => {
    const resetPlayers = players.map(p => ({ ...p, score: 0 }));
    setPlayers(resetPlayers);
    setTurnScore(0);
    setCurrentPlayer(0);
    setGameOver(false);
    setDiceValue(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700 drop-shadow-sm">
        🎲 Dicey Duels
      </h1>

      {/* Player Cards */}
      <div className="flex flex-wrap justify-center gap-8 mb-12 px-4">
        {players.map((player, index) => (
          <div key={index} className="w-full sm:w-[300px]">
            <PlayerCard
              player={player}
              isActive={index === currentPlayer}
              isWinner={gameOver && index === currentPlayer}
            />
          </div>
        ))}
      </div>


      {/* Dice */}
      <div className="flex justify-center mb-10">
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

      {/* Winner Announcement */}
      {gameOver && (
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-bold text-green-600 animate-fade-in-up">
            🎉 {players[currentPlayer].name} Wins!
          </h2>
        </div>
      )}

      {/* Game Action Buttons */}
      <div className="mt-10 flex justify-center gap-6">
        <button
          onClick={resetGame}
          disabled={isRolling}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg shadow transition-all duration-300 disabled:opacity-50"
        >
          <FaRedo />
          Restart Game
        </button>
        <button
          onClick={() => navigate("/names")}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-300"
        >
          <FaHome />
          Home
        </button>
      </div>
    </div>
  );
};

export default Game;
