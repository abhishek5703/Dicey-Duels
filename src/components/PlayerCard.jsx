const PlayerCard = ({ player, isActive }) => {
  const winningScore = 50;
  const progressPercent = Math.min((player.score / winningScore) * 100, 100);

  return (
    <div
      className={`relative p-4 rounded-xl shadow-md transition-all duration-300
        ${isActive ? "bg-green-100 border-4 border-green-500 shadow-lg scale-105" : "bg-white border"}
      `}
    >
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute top-2 right-2 text-yellow-500 text-xl animate-pulse">⭐</div>
      )}

      {/* Player Name */}
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{player.name}</h3>

      {/* Score */}
      <p className="text-lg text-gray-600 text-center">Score: {player.score}</p>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 text-right mt-1">{progressPercent.toFixed(0)}%</p>
      </div>
    </div>
  );
};

export default PlayerCard;
