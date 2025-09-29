import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';
import { ResponseMessage } from '$libs/request/response';

export const checkRideAvailable = async (root: AxiosInstance) => {
  try {
    const response: AxiosResponse = await root.get(
      `/check/find/ride`,
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);
    const dataResponse: ResponseMessage = response.data;

    if (status) {
      return dataResponse.status === 'success';
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }

  return false;
};

export const checkScheduleAvailable = async (root: AxiosInstance) => {
  try {
    const response: AxiosResponse = await root.get(
      `/check/find/schedule`,
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);
    const dataResponse: ResponseMessage = response.data;

    if (status) {
      return dataResponse.status === 'success';
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }

  return false;
};
