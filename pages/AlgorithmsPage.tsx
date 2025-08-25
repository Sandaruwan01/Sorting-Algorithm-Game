
import React from 'react';
import AlgorithmCard from '../components/AlgorithmCard';
import { ALGORITHMS } from '../constants';

const AlgorithmsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
        Choose Your Algorithm
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {ALGORITHMS.map(algo => (
          <AlgorithmCard key={algo.id} algorithm={algo} />
        ))}
      </div>
    </div>
  );
};

export default AlgorithmsPage;
