import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';
import UserRole from '$libs/types/UserRole.ts';
import { ResponseData } from '$libs/request/response';
import TokenResponse from '$libs/request/response/TokenResponse.ts';

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

    const dataResponse: ResponseData<UserRole> = response.data;

    if (status) {
      setCurrentRole(dataResponse.data);
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
    const response: AxiosResponse = await root.post(
      `/auth/role`,
      {
        role: role,
      },
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);
    const dataResponse: ResponseData<TokenResponse> = response.data;

    console.log(dataResponse.data);

    if (status) {
      setToken(dataResponse.data.token);
    }

    return status;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};
