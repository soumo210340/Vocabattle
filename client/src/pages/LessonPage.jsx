import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';

const LessonPage = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [completed, setCompleted] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/login');
    axios.get(`/lessons/${id}`).then(res => setLesson(res.data));
  }, [id, token, navigate]);

  const handleComplete = async () => {
    await axios.post('/progress/complete', { lessonId: id });
    setCompleted(true);
    setTimeout(() => navigate('/dashboard'), 1000);
  };

  if (!lesson) return <div>Loading...</div>;

  return (
    <div>
      <h2>{lesson.title}</h2>
      <div>{lesson.description}</div>
      <ul>
        {lesson.content.map((q, i) => <li key={i}>{q}</li>)}
      </ul>
      <div>XP Value: {lesson.xpValue}</div>
      <button onClick={handleComplete} disabled={completed}>
        {completed ? 'Completed!' : 'Mark as Complete'}
      </button>
    </div>
  );
};

export default LessonPage;
