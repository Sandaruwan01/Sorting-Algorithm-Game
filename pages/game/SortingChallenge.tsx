
import React, { useState, useEffect, useCallback } from 'react';

interface SortingChallengeProps {
  level: number;
  onComplete: (timeSpent: number, marks: number) => void;
}

const generateArray = (level: number) => {
  const size = 5 + level;
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

const SortingChallenge: React.FC<SortingChallengeProps> = ({ level, onComplete }) => {
  const [array, setArray] = useState<number[]>(generateArray(level));
  const [sortedArray, setSortedArray] = useState<number[]>([]);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const resetLevel = useCallback(() => {
    setArray(generateArray(level));
    setSortedArray([]);
    setTime(0);
    setIsActive(true);
  }, [level]);
  
  useEffect(() => {
    resetLevel();
  }, [level, resetLevel]);

  useEffect(() => {
    let interval: number | null = null;
    if (isActive) {
      interval = window.setInterval(() => {
        setTime(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      if(interval) clearInterval(interval);
    }
    return () => {
      if(interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const handleNumberClick = (num: number, index: number) => {
    setArray(prev => prev.filter((_, i) => i !== index));
    setSortedArray(prev => [...prev, num]);
  };

  const handleSubmit = () => {
    setIsActive(false);
    const correctSortedArray = [...array, ...sortedArray].sort((a, b) => a - b);
    const isCorrect = JSON.stringify(sortedArray) === JSON.stringify(correctSortedArray);
    const correctnessFactor = isCorrect ? 1 : 0.5; // Penalty for incorrect sort
    const marks = Math.max(0, Math.floor((100 - time) * correctnessFactor * (level + 1)));
    onComplete(time, marks);
  };
  
  const expectedNextNumber = [...array].sort((a,b) => a-b)[0];

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-white mb-2">Sorting Challenge - Level {level}</h2>
      <p className="text-gray-400 mb-4">Click the numbers in ascending order to sort them!</p>

      <div className="flex justify-between items-center mb-6 bg-gray-900 p-4 rounded-lg">
        <div className="text-lg font-semibold text-purple-400">Time: {time}s</div>
        <div className="text-lg font-semibold text-green-400">Next Number: {array.length > 0 ? expectedNextNumber : 'Done!'}</div>
      </div>
      
      <div className="mb-6 min-h-[6rem] bg-gray-700 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-gray-300">Unsorted</h3>
        <div className="flex flex-wrap justify-center gap-4">
            {array.map((num, index) => (
                <button 
                    key={index} 
                    onClick={() => handleNumberClick(num, index)}
                    className="w-16 h-16 flex items-center justify-center text-2xl font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-transform transform hover:scale-110"
                >
                    {num}
                </button>
            ))}
        </div>
      </div>

      <div className="min-h-[6rem] bg-gray-700 p-4 rounded-lg">
         <h3 className="text-xl font-semibold mb-2 text-gray-300">Sorted</h3>
        <div className="flex flex-wrap justify-center gap-4">
            {sortedArray.map((num, index) => (
                <div key={index} className="w-16 h-16 flex items-center justify-center text-2xl font-bold bg-green-600 text-white rounded-lg">
                    {num}
                </div>
            ))}
        </div>
      </div>
      
      <div className="mt-8 flex justify-center gap-4">
        <button onClick={resetLevel} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg">Reset</button>
        <button onClick={handleSubmit} disabled={array.length > 0} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">Submit Level</button>
      </div>
    </div>
  );
};

export default SortingChallenge;
