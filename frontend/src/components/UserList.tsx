import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);  // Estado para los usuarios
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los registros del backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);  // Guardar los usuarios en el estado
    } catch (err) {
      setError('Error al cargar los usuarios');
    }
  };

  // Ejecutar la función fetchUsers cuando el componente se monta
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para eliminar un usuario
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));  // Eliminar usuario de la lista localmente
    } catch (err) {
      setError('Error al eliminar el usuario');
    }
  };

  return (
    <div className="min-h-screen">
      <h1>Lista de Usuarios</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full overflow-hidden text-black rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 rounded-tl-lg bg-gray-200">ID</th>
            <th className="px-4 py-2 bg-gray-200">Nombre</th>
            <th className="px-4 py-2 bg-gray-200">Email</th>
            <th className="px-4 py-2 rounded-tr-lg bg-gray-200">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-yellow-500">
          {users.map((user) => (
            <tr key={user.id} className="[&>td]:shadow-[inset_0_-1px_0_0_rgba(0,0,0,1)]">
              <td className="px-4 py-2 text-center">{user.id}</td>
              <td className="px-4 py-2 border-l border-black text-center">{user.name}</td>
              <td className="px-4 py-2 border-l border-black text-center">{user.email}</td>
              <td className="px-4 py-2 border-l border-black text-center">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
