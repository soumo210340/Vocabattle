import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/login');
    const fetchData = async () => {
      try {
        const userRes = await axios.get('/users/me');
        setUser(userRes.data);
        const lessonsRes = await axios.get('/lessons');
        setLessons(lessonsRes.data);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, navigate]);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {user && <div className="user-info">Welcome, {user.name}! XP: {user.xp}</div>}
      <button onClick={logout} className="button">Logout</button>
      <h3>Lessons</h3>
      <div className="lesson-list">
        {lessons.map(lesson => (
          <div key={lesson._id} className="lesson-card">
            <div className="lesson-title">{lesson.title}</div>
            <button className="button" onClick={() => navigate(`/lessons/${lesson._id}`)}>View Lesson</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
