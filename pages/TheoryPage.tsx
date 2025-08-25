
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Algorithm } from '../types';
import { getAlgorithmBySlug } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

const TheoryPage: React.FC = () => {
  const { algorithmSlug } = useParams<{ algorithmSlug: string }>();
  const [algorithm, setAlgorithm] = useState<Algorithm | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlgorithm = async () => {
      if (algorithmSlug) {
        setLoading(true);
        const data = await getAlgorithmBySlug(algorithmSlug);
        setAlgorithm(data || null);
        setLoading(false);
      }
    };
    fetchAlgorithm();
  }, [algorithmSlug]);
  
  const handleStartPlay = () => {
      if (user) {
          navigate(`/game/${algorithmSlug}`);
      } else {
          navigate('/auth');
      }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!algorithm) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">Algorithm not found.</h2>
        <Link to="/algorithms" className="text-blue-400 hover:underline mt-4 inline-block">Back to algorithms</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400">{algorithm.name}</h1>
        <p className="text-gray-300 mb-6 text-lg leading-relaxed">{algorithm.theory}</p>
        
        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-200">Visualization</h2>
          <div className="bg-gray-900 rounded-lg p-8 flex items-center justify-center h-64 border-2 border-dashed border-gray-600">
            <p className="text-gray-500">[Illustrative image/diagram placeholder]</p>
          </div>
        </div>

        <button
          onClick={handleStartPlay}
          className={`w-full md:w-auto ${algorithm.color} ${algorithm.hoverColor} text-white font-bold py-3 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
        >
          Start Play
        </button>
      </div>
    </div>
  );
};

export default TheoryPage;
