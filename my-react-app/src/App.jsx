import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  // Configure axios to include credentials (cookies) with every request.
  axios.defaults.withCredentials = true;

  // Function to call the login endpoint
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/login',
        {
          username: 'user',
          password: 'pass'
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setMessage(`Login: ${response.data.message}`);
    } catch (error) {
      console.error(error);
      setMessage('Login failed');
    }
  };

  // Function to call the test endpoint
  const handleTest = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/test',
        {}, // No body data required for this endpoint
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setMessage(`Test: ${response.data.message}`);
    } catch (error) {
      console.error(error);
      setMessage('Test failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>React App Testing Express Endpoints with Axios</h1>
      <button onClick={handleLogin} style={{ marginRight: '1rem' }}>
        Login
      </button>
      <button onClick={handleTest}>Test Cookie</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
