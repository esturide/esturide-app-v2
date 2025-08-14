import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';

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
