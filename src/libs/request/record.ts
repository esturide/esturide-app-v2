import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';
import Location from '$libs/types/Location.ts';

export const recordCurrentLocation = async (
  root: AxiosInstance,
  request: Location,
) => {
  try {
    const response: AxiosResponse = await root.post(
      `/record`,
      request,
      getRequestConfig(),
    );

    return [200, 201].includes(response.status);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};
