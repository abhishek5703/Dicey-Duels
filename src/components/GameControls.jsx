const GameControls = ({
  turnScore,
  currentPlayer,
  rollDice,
  holdScore,
  gameOver,
}) => {
  return (
    <div className="mt-6 text-center">
      <h2 className="text-xl mb-4 font-semibold text-gray-800">
        🎯 {currentPlayer}'s Turn | Turn Score: {turnScore}
      </h2>

      {!gameOver && (
        <div className="flex justify-center gap-4">
          <button
            onClick={rollDice}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            🎲 Roll
          </button>
          <button
            onClick={holdScore}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg shadow-md transition-all duration-200 hover:bg-purple-600 hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            ✋ Hold
          </button>
        </div>
      )}
    </div>
  );
};

export default GameControls;
