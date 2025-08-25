
import React from 'react';
import { Link } from 'react-router-dom';
import { Algorithm } from '../types';

interface AlgorithmCardProps {
  algorithm: Algorithm;
}

const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ algorithm }) => {
  return (
    <Link 
        to={`/theory/${algorithm.slug}`} 
        className={`group flex flex-col items-center justify-center p-8 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 duration-300 ${algorithm.color} ${algorithm.hoverColor}`}
    >
      <div className="text-center">
        <div className="text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">
            {/* Placeholder for an icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-white">{algorithm.name}</h3>
      </div>
    </Link>
  );
};

export default AlgorithmCard;
