import axios, { AxiosResponse } from 'axios';
import { configHeaderAuthToken, getRequestConfig, getRequestRoot } from '$libs/request/api.ts';

export interface UserDataLogin {
  readonly code: number;
  readonly password: string;
}

export const loginUser = async (
  user: UserDataLogin,
  setAuthToken: (token: string) => void,
) => {
  try {
    const data = {
      username: user.code,
      password: user.password,
    };

    const response: AxiosResponse = await getRequestRoot().post(
      `/auth/login`,
      data,
      getRequestConfig(),
    );

    const status = response.status === 200 || response.status === 201;

    if (status) {
      const accessToken = response.data.token;

      setAuthToken(accessToken);
      configHeaderAuthToken(accessToken);
    }

    return status;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};
