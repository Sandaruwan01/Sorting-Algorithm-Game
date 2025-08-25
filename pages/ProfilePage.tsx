import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <img 
              className="h-32 w-32 rounded-full object-cover border-4 border-purple-500"
              src={user.profilePictureUrl || `https://i.pravatar.cc/150?u=${user.email}`} 
              alt="Profile" 
            />
            <button className="mt-4 w-full text-sm bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded">Upload Picture</button>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-gray-400">{user.email}</p>
             <p className="text-gray-400">Role: {user.userRole}</p>
            <p className="text-sm text-gray-500 capitalize">{user.role} Account</p>
            <button className="mt-4 text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Edit Profile</button>
          </div>
        </div>
        
        <div className="mt-10 border-t border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Game Statistics</h2>
          <div className="bg-gray-700 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-300">Total Marks</span>
              <span className="text-2xl font-bold text-green-400">{user.totalMarks || 0}</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Individual Game Scores</h3>
            <ul className="space-y-2">
              {user.gameScores && user.gameScores.length > 0 ? (
                user.gameScores.map((game, index) => (
                    <li key={index} className="flex justify-between p-3 bg-gray-800 rounded">
                    <span className="text-gray-300">{game.algorithm}</span>
                    <span className="font-semibold text-purple-400">{game.score}</span>
                    </li>
                ))
              ) : (
                <p className="text-gray-400">No games played yet.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
