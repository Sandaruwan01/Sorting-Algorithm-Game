import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { UserRoleType } from '../types';

const userRoles: UserRoleType[] = ['O/L Student', 'A/L Student', 'Undergraduate', 'Fresh Graduate', 'IT Related Person', 'Other'];

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [userRole, setUserRole] = useState<UserRoleType>('Other');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
        if (isLogin) {
            await login(email, password);
            navigate('/profile');
        } else {
            await register({ name, email, pass: password, dob, userRole });
            alert('Registration successful! Please log in.');
            setIsLogin(true);
            setPassword('');
        }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required={!isLogin}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="dob">Date of Birth</label>
                <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required={!isLogin}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2" htmlFor="userRole">I am a...</label>
                <select
                    id="userRole"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value as UserRoleType)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required={!isLogin}
                >
                    {userRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => { setIsLogin(!isLogin); setError('') }} className="text-blue-400 hover:underline ml-2">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
         {isLogin && (
            <div className="text-xs text-gray-500 mt-4 text-center border-t border-gray-700 pt-3">
                <p className="font-bold">Test Credentials:</p>
                <p>Admin: <span className="font-mono">wps.sandaruwanofficial@gmail.com</span> / <span className="font-mono">myChaminiAravindya</span></p>
                <p>User: <span className="font-mono">user@example.com</span> / <span className="font-mono">password123</span></p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
