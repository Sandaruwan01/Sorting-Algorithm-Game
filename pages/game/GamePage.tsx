import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import McqQuiz from './McqQuiz';
import SortingChallenge from './SortingChallenge';
import { getQuestionsForAlgorithm, getAlgorithmBySlug, submitGameResult } from '../../services/api';
import { Question, Algorithm } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';

type GameStage = 'initial-quiz' | 'challenge' | 'final-quiz' | 'results';

const GamePage: React.FC = () => {
  const { algorithmSlug } = useParams<{ algorithmSlug: string }>();
  const navigate = useNavigate();
  const [stage, setStage] = useState<GameStage>('initial-quiz');
  const [level, setLevel] = useState(1);
  const [totalMarks, setTotalMarks] = useState(0);
  const [initialMcqScore, setInitialMcqScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [algorithm, setAlgorithm] = useState<Algorithm | null>(null);
  const [loading, setLoading] = useState(true);
  const [finalScore, setFinalScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    const setupGame = async () => {
      if (!algorithmSlug) return;
      setLoading(true);
      const algoData = await getAlgorithmBySlug(algorithmSlug);
      setAlgorithm(algoData || null);
      if (stage === 'initial-quiz') {
        const quizQuestions = await getQuestionsForAlgorithm(algorithmSlug, 5);
        setQuestions(quizQuestions);
      } else if (stage === 'final-quiz') {
        const quizQuestions = await getQuestionsForAlgorithm(algorithmSlug, 10);
        setQuestions(quizQuestions);
      }
      setLoading(false);
    };
    setupGame();
  }, [algorithmSlug, stage]);
  
  const handleInitialQuizComplete = (score: number) => {
    setInitialMcqScore(score);
    setTotalMarks(score * 20); // 20 marks per correct answer
    setStage('challenge');
  };

  const handleChallengeComplete = (timeSpent: number, marks: number) => {
    setTotalMarks(prev => prev + marks);
    if (level < 6) {
      setLevel(prev => prev + 1);
    } else {
      setStage('final-quiz');
    }
  };

  const handleFinalQuizComplete = async (score: number) => {
    const finalQuizMarks = score * 50; // 50 marks per correct answer
    const finalTotalMarks = totalMarks + finalQuizMarks;
    
    setTotalMarks(finalTotalMarks);
    setFinalScore({ correct: score, total: 10 });

    try {
        if(algorithmSlug) {
            await submitGameResult(algorithmSlug, finalTotalMarks, initialMcqScore, score);
        }
    } catch(error) {
        console.error("Failed to submit game results:", error);
        // Optionally show an error message to the user
    } finally {
        setStage('results');
    }
  };
  
  if (loading) return <LoadingSpinner />;
  if (!algorithm) return <div>Algorithm not found.</div>

  const renderStage = () => {
    switch (stage) {
      case 'initial-quiz':
        return (
          <>
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Initial Quiz: {algorithm.name}</h1>
            <McqQuiz questions={questions} onComplete={handleInitialQuizComplete} />
          </>
        );
      case 'challenge':
        return <SortingChallenge level={level} onComplete={handleChallengeComplete} />;
      case 'final-quiz':
        return (
           <>
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Final Quiz: {algorithm.name}</h1>
            <McqQuiz questions={questions} timeLimit={600} onComplete={handleFinalQuizComplete} />
          </>
        );
      case 'results':
        return (
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl text-center max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-green-400 mb-4">Congratulations!</h1>
            <p className="text-gray-300 text-lg mb-6">You have completed the {algorithm.name} challenge.</p>
            <div className="text-2xl mb-2">Final Quiz Score: <span className="font-bold text-purple-400">{finalScore.correct} / {finalScore.total}</span></div>
            <div className="text-3xl mb-8">Total Marks: <span className="font-bold text-yellow-400">{totalMarks}</span></div>
            <button onClick={() => navigate('/algorithms')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
              Play Another
            </button>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {renderStage()}
    </div>
  );
};

export default GamePage;
