
import React, { useState, useEffect } from 'react';
import { Question } from '../../types';

interface McqQuizProps {
  questions: Question[];
  timeLimit?: number; // in seconds
  onComplete: (score: number) => void;
}

const McqQuiz: React.FC<McqQuizProps> = ({ questions, timeLimit, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (timeLimit) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime !== undefined && prevTime <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prevTime !== undefined ? prevTime - 1 : undefined;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLimit]);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
        handleSubmit();
    }
  };
  
  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score++;
      }
    });
    onComplete(score);
  };

  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) {
      return <div>Loading questions...</div>;
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Question {currentQuestionIndex + 1}/{questions.length}</h2>
        {timeLeft !== undefined && (
          <div className="text-lg font-semibold text-red-500">
            Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        )}
      </div>

      <p className="text-xl text-gray-300 mb-6">{currentQuestion.question}</p>

      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
              answers[currentQuestionIndex] === option
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      
      <div className="mt-8 text-right">
        <button
          onClick={handleNext}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default McqQuiz;
