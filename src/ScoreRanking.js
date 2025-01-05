import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

const ScoreDisplay = ({ currentScore }) => {
  const [showRankings, setShowRankings] = useState(false);
  
  // מידע על המשתמשים (לדוגמה - בפרויקט אמיתי זה יגיע מהשרת)
  const rankings = [
    { id: 1, name: "Player 1", score: 1500 },
    { id: 2, name: "Player 2", score: 1200 },
    { id: 3, name: "You", score: currentScore },
    { id: 4, name: "Player 4", score: 800 },
    { id: 5, name: "Player 5", score: 600 }
  ].sort((a, b) => b.score - a.score);

  const playerRank = rankings.findIndex(player => player.name === "You") + 1;

  const getRankColor = (index) => {
    switch(index) {
      case 0: return 'text-yellow-400';  // זהב
      case 1: return 'text-gray-400';    // כסף
      case 2: return 'text-amber-600';    // ארד
      default: return 'text-white';
    }
  };

  return (
    <div className="relative">
      {/* תצוגת הניקוד הראשית - תמיד מוצגת */}
      <div 
        onClick={() => setShowRankings(!showRankings)} 
        className="bg-orange-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-600 transition-colors"
      >
        <span className="text-white font-bold">Score: {currentScore}</span>
        <span className="text-sm ml-2 text-white">Rank #{playerRank}</span>
      </div>

      {/* חלון הדירוג - מוצג רק בלחיצה */}
      {showRankings && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-lg font-bold">Player Rankings</h3>
            <button 
              onClick={() => setShowRankings(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2">
            {rankings.map((player, index) => (
              <div 
                key={player.id}
                className={`flex items-center justify-between p-3 rounded ${
                  player.name === "You" ? 'bg-orange-500/20' : 'bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Trophy className={`h-5 w-5 ${getRankColor(index)}`} />
                  <span className={`font-medium ${getRankColor(index)}`}>
                    {index + 1}.
                  </span>
                  <span className="text-white">{player.name}</span>
                </div>
                <span className="text-white font-mono">{player.score}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-600">
            <p className="text-center text-white">
              Your Position: {playerRank} of {rankings.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreDisplay;