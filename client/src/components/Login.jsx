import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';

const defaultUser = {
  email: 'sarah@greensprout.co',
  password: 'GrowBiz#2025',
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState(defaultUser.email);
  const [password, setPassword] = useState(defaultUser.password);
  const navigate = useNavigate();

  const { setUser } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/users/login', { email, password });
      const data = response.data;

      
    const loggedInUser = {
      id: data.user.id,
      firstname: data.user.firstname,
      lastname: data.user.lastname,
      username: data.user.username,
      email: data.user.email,
    };

    setUser(loggedInUser);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));


    onLogin(); //Call onLogin passed from App.js
    
    navigate('/');
  } catch (error) {
    console.error('Login failed', error);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
