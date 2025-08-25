
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-gray-900">
      <div className="text-center p-8">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-500">
          Sorting Arcade
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Welcome to the ultimate playground for mastering sorting algorithms! Sorting algorithms are fundamental to computer science, organizing data into a meaningful order. They are used everywhere, from databases to rendering graphics and even in your favorite social media feeds. Learning them not only sharpens your problem-solving skills but also provides a deep understanding of efficiency and logic in programming.
        </p>
        <Link
          to="/algorithms"
          className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
