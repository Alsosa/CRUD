import React, { useState, useEffect } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const success = await login({ email, password });
      if (success) {
        alert(`Login exitoso!`);
        localStorage.setItem('userEmail', email);
        navigate('/')
      } else {
        alert('Credenciales incorrectas.');
      }
    } catch (error) {
      alert('Error en el login');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button
        onClick={handleLogin}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
