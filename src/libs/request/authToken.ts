import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';
import { ResponseData } from '$libs/request/response';
import TokenResponse from '$libs/request/response/TokenResponse.ts';

export const checkToken = async (
  root: AxiosInstance,
  setStatus: (status: boolean) => void,
) => {
  try {
    const response: AxiosResponse = await root.post(
      `/auth/check`,
      {},
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);
    const data = response.data;

    if (status) {
      setStatus(data.status == 'success');
    }

    return status;
  } catch (e) {
    setStatus(false);

    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};

export const refreshToken = async (
  root: AxiosInstance,
  setAuthToken: (token: string) => void,
) => {
  try {
    const response: AxiosResponse = await root.post(
      `/auth/refresh`,
      {},
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);
    const dataResponse: ResponseData<TokenResponse> = response.data;

    if (status && dataResponse.status == 'success') {
      setAuthToken(dataResponse.data.token);
    }

    return status;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};
