import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/LessonPage.css'; // Importing CSS for the component

const LessonPage = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/login');
    axios.get(`/lessons/${id}`)
      .then(res => setLesson(res.data))
      .catch(() => setError('Failed to load lesson.'))
      .finally(() => setLoading(false));
  }, [id, token, navigate]);

  const handleComplete = async () => {
    try {
      await axios.post('/progress/complete', { lessonId: id });
      setCompleted(true);
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch {
      setError('Failed to mark lesson as complete.');
    }
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!lesson) return null;

  return (
    <div className="lesson-container">
      <h2>{lesson.title}</h2>
      <div>{lesson.description}</div>
      <ul>
        {lesson.content.map((q, i) => <li key={i}>{q}</li>)}
      </ul>
      <div>XP Value: {lesson.xpValue}</div>
      <button onClick={handleComplete} disabled={completed} className="button">
        {completed ? 'Completed!' : 'Mark as Complete'}
      </button>
    </div>
  );
};

export default LessonPage;
