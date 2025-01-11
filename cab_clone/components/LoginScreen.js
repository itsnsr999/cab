import React, { useState } from 'react';
import "./Loginscreen.css";

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(e);
  };

  return (
    <>
    <div className='ls'>
    <div className="login-screen">
      <form onSubmit={handleSubmit}>
        <h2>Please Login </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <div className='space'></div>
    </div>
   
    <button className="login-screen-button" onClick={handleSubmit}>Next</button>
    </div></>
  );
};

export default LoginScreen;
