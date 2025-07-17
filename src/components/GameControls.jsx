const GameControls = ({
  turnScore,
  currentPlayer,
  rollDice,
  holdScore,
  gameOver,
}) => {
  return (
    <div className="mt-6 text-center">
      <h2 className="text-xl mb-4">
        🎯 {currentPlayer}'s Turn | Turn Score: {turnScore}
      </h2>

      {!gameOver && (
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            onClick={rollDice}
          >
            🎲 Roll
          </button>
          <button
            className="px-6 py-2 bg-purple-500 text-white rounded-lg"
            onClick={holdScore}
          >
            ✋ Hold
          </button>
        </div>
      )}
    </div>
  );
};

export default GameControls;
