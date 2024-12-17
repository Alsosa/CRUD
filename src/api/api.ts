// Creo una solicitud de crear registro
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createRegister = async (data: { name: string; email: string }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el registro:', error);
    throw error;
  }
};
