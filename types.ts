export type UserRoleType = 'O/L Student' | 'A/L Student' | 'Undergraduate' | 'Fresh Graduate' | 'IT Related Person' | 'Other';

export interface User {
  id: number;
  name: string;
  email: string;
  dob: string; // Added Date of Birth
  userRole: UserRoleType; // Added user role from dropdown
  role: 'user' | 'admin'; // System role
  profilePictureUrl?: string;
  totalMarks: number;
  gameScores: { algorithm: string; score: number }[];
}

export interface Algorithm {
  id: string;
  slug: string;
  name: string;
  description: string;
  theory: string;
  color: string;
  hoverColor: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  totalMarks: number;
}

export interface AdminSummaryData {
  user: {
    id: number;
    name: string;
    email: string;
    userRole: UserRoleType; // Added user role
    profilePictureUrl?: string;
  };
  initialMcqScore: number | null;
  finalMcqScore: number | null;
  algorithmScores: {
    'bubble-sort': number | null;
    'selection-sort': number | null;
    'insertion-sort': number | null;
    'merge-sort': number | null;
    'quick-sort': number | null;
  };
}