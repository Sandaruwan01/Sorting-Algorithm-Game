
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${isActive ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`;

    return (
        <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-500">
                            Sorting Arcade
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to="/leaderboard" className={navLinkClass}>LeaderBoard</NavLink>
                            <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
                            <NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink>
                            {user?.role === 'admin' && (
                                <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
                            )}
                            {user ? (
                                <>
                                    <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
                                    <button onClick={logout} className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Logout</button>
                                </>
                            ) : (
                                <NavLink to="/auth" className={navLinkClass}>Login</NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
