import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));


  const handleLogout = () => {
    fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then(() => {
      setToken(null);
      localStorage.removeItem('token');
    });
  };

  return (
      <div className="App">
        {!token ? (
          <Login setToken={setToken} />
        ) : (
          <Home handleLogout={handleLogout}/>
        )}
      </div>
  );
};

export default App;
