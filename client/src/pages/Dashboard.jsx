import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { AuthContext } from '../features/AuthContext';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/login');
    const fetchData = async () => {
      const userRes = await axios.get('/users/me');
      setUser(userRes.data);
      const lessonsRes = await axios.get('/lessons');
      setLessons(lessonsRes.data);
    };
    fetchData();
  }, [token, navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {user && <div>Welcome, {user.name}! XP: {user.xp}</div>}
      <button onClick={logout}>Logout</button>
      <h3>Lessons</h3>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson._id}>
            <button onClick={() => navigate(`/lessons/${lesson._id}`)}>{lesson.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
