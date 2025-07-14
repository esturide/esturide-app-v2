import client from './client'
import { CreateUser } from '@/types/user'

/**
 * Envía un nuevo usuario al backend.
 * @param data Los datos del usuario conforme a la interfaz CreateUser.
 */
export const createUser = async (data: CreateUser) => {
  try {
    const response = await client.post('/v1/user-management/user/', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};
