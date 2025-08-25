import { Question, User, LeaderboardEntry, AdminSummaryData, Algorithm } from '../types';

const API_URL = 'http://localhost:5000/api';

const getAuthToken = () => localStorage.getItem('token');

// Helper function for authenticated requests
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || 'Request failed');
  }
  return response.json();
};


export const getAlgorithms = async (): Promise<Algorithm[]> => {
  return fetchWithAuth(`${API_URL}/algorithms`);
};

export const getAlgorithmBySlug = async (slug: string): Promise<Algorithm | undefined> => {
  return fetchWithAuth(`${API_URL}/algorithms/${slug}`);
};

export const getQuestionsForAlgorithm = async (slug: string, count: number): Promise<Question[]> => {
  return fetchWithAuth(`${API_URL}/game/questions/${slug}?count=${count}`);
};

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  return fetchWithAuth(`${API_URL}/leaderboard`);
};

export const getAdminSummaryData = async (): Promise<AdminSummaryData[]> => {
  return fetchWithAuth(`${API_URL}/admin/summary`);
};

export const submitGameResult = async (algorithmSlug: string, totalMarks: number, initialMcqScore: number, finalMcqScore: number): Promise<void> => {
    return fetchWithAuth(`${API_URL}/game/score`, {
        method: 'POST',
        body: JSON.stringify({ algorithmSlug, totalMarks, initialMcqScore, finalMcqScore })
    });
};

export const getProfile = async (): Promise<User> => {
    return fetchWithAuth(`${API_URL}/users/profile`);
};
