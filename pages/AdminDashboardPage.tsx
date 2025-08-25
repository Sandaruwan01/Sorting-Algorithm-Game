import React, { useState, useEffect } from 'react';
import { getAdminSummaryData } from '../services/api';
import { AdminSummaryData } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { ALGORITHMS } from '../constants';

const AdminDashboardPage: React.FC = () => {
  const [data, setData] = useState<AdminSummaryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getAdminSummaryData();
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  
  const renderScore = (score: number | null) => {
    if (score === null) {
      return <span className="text-gray-500">N/A</span>;
    }
    return <span className="font-semibold text-purple-400">{score}</span>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
        Admin Dashboard: User Progress
      </h1>
      <div className="bg-gray-800 shadow-2xl rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Initial MCQ</th>
              {ALGORITHMS.map(algo => (
                <th key={algo.slug} className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">{algo.name}</th>
              ))}
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Final MCQ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {data.map(({ user, initialMcqScore, finalMcqScore, algorithmScores }) => (
              <tr key={user.id} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={`https://picsum.photos/seed/${user.id}/40`} alt={`${user.name}'s profile`} />
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-white">{user.name}</div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-300">{user.userRole}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">{renderScore(initialMcqScore)}</td>
                {ALGORITHMS.map(algo => (
                    <td key={algo.slug} className="px-6 py-4 whitespace-nowrap text-center text-sm">
                        {renderScore(algorithmScores[algo.slug as keyof typeof algorithmScores])}
                    </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">{renderScore(finalMcqScore)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardPage;