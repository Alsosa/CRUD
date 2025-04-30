import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { createRegister } from './api/api';
import { getUserRoles } from './api/auth';
import UserList from './components/UserList';
import Login from './components/Login';

const Home: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem('userEmail'));
  const [roles, setRoles] = useState<string[]>([]);
  const [rolesFetched, setRolesFetched] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      if (userEmail) {
        try {
          const roles = await getUserRoles(userEmail);
          setRoles(roles);
          setRolesFetched(true);
        } catch (error) {
          console.error('Error fetching roles:', error);
        }
      }
    };
  
    fetchRoles();
  }, [userEmail]);
  

  const handleCreate = async () => {
    try {
      const newRecord = await createRegister({ name, email });
      console.log('Registro creado:', newRecord);
      alert('Registro creado con éxito!');
    } catch (error) {
      alert('Error al crear el registro.');
    }
  };

  return (
    <div className="p-6">
      {userEmail ? (
        <div className="mb-4">
          <p className="text-green-600">Estás logueado como: {userEmail}</p>
          {roles.length > 0 ? (
            <p>Roles: {roles.join(', ')}</p>
          ) : rolesFetched ? (
            <p>No se encontraron roles</p>
          ) : (
            <p>Cargando roles...</p>
          )}
          <button
            onClick={() => {
              localStorage.removeItem('userEmail');
              window.location.reload();
            }}
            className="bg-red-500 text-white px-3 py-1 rounded ml-2"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <p className="text-red-500 mb-4">No has iniciado sesión</p>
      )}
      <h1 className="text-2xl font-bold mb-4">Crear Registro</h1>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Crear Registro
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="p-6">
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-500">Inicio</Link>
          <Link to="/users" className="mr-4 text-blue-500">Usuarios</Link>
          <Link to="/login" className="text-blue-500">Login</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
