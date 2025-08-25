
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-128px)] flex flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">404</h1>
      <h2 className="text-4xl font-bold text-white mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-2 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
