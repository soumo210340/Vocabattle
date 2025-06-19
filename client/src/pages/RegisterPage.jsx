import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './RegisterPage.css'; // Import the CSS file for styling

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/auth/register', { name, email, password });
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Register</h2>
      {error && <div className="error-message" role="alert">{error}</div>}
      <label htmlFor="name">Name</label>
      <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required className="input" />
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="input" />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="input" />
      <button type="submit" className="button" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
    </form>
  );
};

export default RegisterPage;
