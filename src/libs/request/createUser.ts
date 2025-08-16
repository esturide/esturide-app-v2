import axios, { AxiosInstance } from 'axios';

interface UserForm {
  readonly code: number;
  readonly firstName: string;
  readonly maternalSurname: string;
  readonly paternalSurname: string;
  readonly curp: string;
  readonly birthDate: Date;
  readonly email: string;
  readonly password: string;
}

export const createUser = async (root: AxiosInstance, user: UserForm) => {
  try {
    const response = await root.post('/user', user);

    return response.status in [200, 201];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return false;
    }

    throw error;
  }
};
