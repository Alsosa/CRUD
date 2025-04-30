// El propósito de este archivo es centralizar las solicitudes relacionadas
// con la autenticación (login, roles, etc.)

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Interfaz para los datos de login
interface LoginData {
  email: string;
  password: string;
}

// Función para hacer login
export const login = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error en la autenticación');
  }
};

// Función para obtener roles del usuario
export const getUserRoles = async (email: string): Promise<string[]> => {
  const response = await fetch(`http://localhost:5000/api/user-roles?email=${email}`);
  if (!response.ok) {
    throw new Error('Error al obtener roles');
  }
  const data = await response.json();
  return data;
};

