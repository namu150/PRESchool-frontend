import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/loginUser'; // <-- Import the correct function
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: setUser } = useAuth();
  const { login } = useAuth();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const user = localStorage.getItem('user');
  //   if (token && user) {
  //     // setUser(JSON.parse(user), password);
  //     // setToken(token); // Removed because setToken does not exist
  //   }
  // }, [setUser]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');

  //   try {
  //     const response = await loginUser(email, password);
  //     localStorage.setItem('token', response.accessToken);
  //     localStorage.setItem('user', JSON.stringify(response.user));
  //     setUser(response.user, password); // Set user in context
  //     navigate('/dashboard');           // Redirect to dashboard
  //   } catch (err: any) {
  //     setError(err.message || 'Login failed');
  //   }
  // };
  const clickLogin = async () => {
    setError('');
    try {
      const response = await loginUser(email, password);
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      console.log('Login response:', response.user);
      setIsLogin(true);
      // setUser(response.user, password); // Set user in context
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };
  useEffect(() => {
    if(isLogin)
      navigate('/dashboard'); // Redirect to dashboard
  }, [isLogin]);
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button onClick={clickLogin} variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;