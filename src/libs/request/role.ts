import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';
import UserRole from '$libs/types/UserRole.ts';

export const getUserRole = async (
  root: AxiosInstance,
  setCurrentRole: (role: UserRole) => void,
) => {
  try {
    const response: AxiosResponse = await root.get(
      `/auth/role`,
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);

    if (status) {
      setCurrentRole(response.data.role);
    }

    return status;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};

export const setUserRole = async (
  root: AxiosInstance,
  role: UserRole,
  setToken: (token: string) => void,
) => {
  try {
    const response: AxiosResponse = await root.put(
      `/auth/role`,
      {
        role: role,
      },
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);

    console.log(response);

    if (status) {
      setToken(response.data);
    }

    return status;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};
