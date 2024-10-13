import React, { useState, useEffect } from 'react';
import './App.css'; // Asegúrate de importar el archivo CSS
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));


  const handleLogout = () => {
    fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,  // Pasamos el token en los headers
      }
    }).then(() => {
      setToken(null);
      localStorage.removeItem('token'); // Limpiamos el token del frontend
    });
  };

  return (
      <div className="App">
        <h1>Partidas de Ajedrez</h1>
        {!token ? (
          <Login setToken={setToken} />
        ) : (
          <Home handleLogout={handleLogout}/>
        )}
      </div>
  );
};

export default App;
