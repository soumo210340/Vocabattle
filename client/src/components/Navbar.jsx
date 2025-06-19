import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css'; // Importing the CSS file for Navbar

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <button onClick={handleLogout} className="button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
