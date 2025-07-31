import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear token from context
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div>
          <a href="/" className="mr-4">Home</a>
          <a href="/dashboard" className="mr-4">Dashboard</a>
        </div>
        <div>
          {token ? (
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          ) : (
            <a href="/login" className="bg-blue-500 px-3 py-1 rounded">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;