const PlayerCard = ({ player, isActive }) => {
  const winningScore = 100;
  const progressPercent = Math.min((player.score / winningScore) * 100, 100);

  return (
    <div
      className={`relative p-5 rounded-2xl shadow-lg transition-all duration-300 border-2 transform 
        ${isActive ? "bg-gradient-to-r from-green-100 via-green-200 to-green-100 border-green-500 scale-105" : "bg-white border-gray-200"}
        hover:scale-105 hover:shadow-xl cursor-pointer
      `}
    >
      {/* Active Star */}
      {isActive && (
        <div className="absolute top-3 right-3 text-yellow-400 text-2xl animate-bounce">⭐</div>
      )}

      {/* Avatar */}
      <div className="flex justify-center mb-3">
        <img
          src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${player.name}`}
          alt="avatar"
          className="w-16 h-16 rounded-full border-2 border-gray-300"
        />
      </div>

      {/* Name */}
      <h3 className="text-xl font-extrabold text-center text-gray-800 flex items-center justify-center gap-2">
        {player.name} 🎮
      </h3>

      {/* Score */}
      <p className="text-lg text-center text-gray-600 mt-1">
        🏆 Score: <span className="font-semibold text-green-700">{player.score}</span>
      </p>

      {/* Progress */}
      <div className="mt-4">
        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 text-right mt-1">{progressPercent.toFixed(0)}%</p>
      </div>

      {/* Motivational Note */}
      <p className="text-xs text-center text-blue-500 mt-2 italic">
        {progressPercent >= 100 ? "🎉 Finished!" : "🔥 Keep going!"}
      </p>
    </div>
  );
};

export default PlayerCard;
