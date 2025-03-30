import React, { useState } from 'react';
import { createRegister } from './api/api';
import UserList from './components/UserList'

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
      <UserList></UserList>
    </div>
  );
};

export default App;
