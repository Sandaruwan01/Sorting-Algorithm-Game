import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRoleType } from '../types';
import { getProfile } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<User>;
  register: (userData: { name: string, email: string, pass: string, dob: string, userRole: UserRoleType }) => Promise<any>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000/api';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const profileData = await getProfile();
          setUser(profileData);
        } catch (error) {
          console.error("Session expired or token invalid", error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    validateToken();
  }, [token]);

  const login = async (email: string, pass: string): Promise<User> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const { token: receivedToken, user: loggedInUser } = await response.json();
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (userData: { name: string, email: string, pass: string, dob: string, userRole: UserRoleType }): Promise<any> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
          username: userData.name,
          email: userData.email,
          password: userData.pass,
          date_of_birth: userData.dob,
          user_role: userData.userRole
       }),
    });
     if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    return response.json();
  };


  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = { user, token, login, register, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
