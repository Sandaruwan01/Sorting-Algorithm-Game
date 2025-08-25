
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400">About Sorting Arcade</h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          Sorting Arcade was born from a passion for making computer science concepts accessible and fun. We believe that learning should be an engaging experience, not a chore. Our mission is to transform the way students and enthusiasts learn about fundamental algorithms by combining education with interactive gameplay.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          Our platform provides detailed theoretical explanations, visual aids, and a unique gaming environment where you can test your knowledge and skills. Compete against others on the global leaderboard and track your progress as you master each sorting technique.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          Whether you're a student just starting your coding journey, a developer looking to refresh your knowledge, or simply a curious mind, Sorting Arcade is the place for you.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
