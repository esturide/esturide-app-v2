import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';

export interface UserDataLogin {
  readonly code: number;
  readonly password: string;
}

export const loginUser = async (
  root: AxiosInstance,
  user: UserDataLogin,
  setAuthToken: (token: string) => Promise<void>,
) => {
  try {
    const response: AxiosResponse = await root.post(
      `/auth/login`,
      {
        username: user.code,
        password: user.password,
      },
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);

    if (status) {
      await setAuthToken(response.data.token);
    }

    return status;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};
