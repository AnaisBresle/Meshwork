import React, { useState } from 'react'; 
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useSession();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Debug: log the data before sending
    console.log('Sending signup data:', formData);

    // Simple client-side validation
    const emptyFields = Object.entries(formData)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setError(`Please fill out: ${emptyFields.join(', ')}`);
      return;
    }

    try {
      const response = await api.post('/api/users/signup', formData);
      const data = response.data;

      // Save user in context
      setUser({
        username: data.user.username,
        id: data.user.id,
      });

      localStorage.setItem('authToken', data.token);
      navigate('/'); // Redirect to blog/home page
    } catch (err) {
      // Show backend validation errors
      setError(err.response?.data?.message || 'Signup failed');
      console.error('Signup error:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Blog Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={formData.firstname}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={formData.lastname}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
