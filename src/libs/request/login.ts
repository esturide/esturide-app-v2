import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';
import UserDataLogin from '$libs/request/response/UserDataLogin.ts';
import { ResponseData } from '$libs/request/response';
import TokenResponse from '$libs/request/response/TokenResponse.ts';

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
    const dataResponse: ResponseData<TokenResponse> = response.data;

    if (status) {
      await setAuthToken(dataResponse.data.token);
    }

    return status;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};
