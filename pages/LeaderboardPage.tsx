
import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/api';
import { LeaderboardEntry } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const data = await getLeaderboard();
      setLeaderboard(data);
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-yellow-600';
    return 'text-gray-400';
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
        Global Leaderboard
      </h1>
      <div className="bg-gray-800 shadow-2xl rounded-lg overflow-hidden max-w-4xl mx-auto">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Player</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Marks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {leaderboard.map(entry => (
              <tr key={entry.rank} className="hover:bg-gray-700/50">
                <td className={`px-6 py-4 whitespace-nowrap text-lg font-bold ${getRankColor(entry.rank)}`}>
                  #{entry.rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={`https://picsum.photos/seed/${entry.user.id}/40`} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{entry.user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold text-purple-400">
                  {entry.totalMarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
