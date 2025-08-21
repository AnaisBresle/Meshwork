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
       const response = await api.post(
      'http://localhost:3001/api/users/login',
      { email, password }, // must match backend keys
      { headers: { 'Content-Type': 'application/json' } } // explicit just in case
    );
   

    // Destructure the real data from Axios response
    const { user, token, firstLogin } = response.data;


      const loggedInUser = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
       last_login: user.last_login, 
    };

    setUser(loggedInUser);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));


    //redirection logic

      // REDIRECTION LOGIC: CHANGED
if (firstLogin) {
    navigate('/create-profile');
} else {
    navigate('/');
}



      onLogin(); //Call onLogin passed from App.js
  } catch (error) {
    console.error('Login failed', error);
    alert('Login failed. Check your credentials.');
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
