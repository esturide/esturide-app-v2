import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';
import { ResponseMessage } from '$libs/request/response';

export interface RideOptions {
  readonly origin: string;
  readonly destination: string;
  readonly exiting: Date;
}

export const requestRideTravel = async (root: AxiosInstance, request: RideOptions) => {
  const dataRequest = {
    origin: request.origin,
    destination: request.destination,
    exiting: request.exiting.toISOString(),
  };

  try {
    const response: AxiosResponse = await root.post(
      `/ride/`,
      dataRequest,
      getRequestConfig(),
    );

    const data: ResponseMessage = response.data;

    if ([200, 201].includes(response.status)) {
      return data.status === 'success';
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }

  return false;
};
