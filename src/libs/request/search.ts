import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';
import { ResponseData } from '$libs/request/response';
import LocationsResponse from '$libs/request/response/location.ts';
import ReverseLocationsResponse from '$libs/request/response/reverse.ts';

export const searchLocationFromAddress = async (
  root: AxiosInstance,
  address: string,
  setResult: (locations: LocationsResponse[]) => void,
) => {
  try {
    const response: AxiosResponse = await root.post(
      `/location/search`,
      { address: address },
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);
    const dataResponse: ResponseData<LocationsResponse[]> = response.data;

    if (status) {
      setResult(dataResponse.data);
    }

    return status;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};

export const researchLocationFromAddress = async (
  root: AxiosInstance,
  location: LocationsResponse,
  setResult: (locations: ReverseLocationsResponse) => void,
) => {
  try {
    const response: AxiosResponse = await root.post(
      `/location/search`,
      location,
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);
    const dataResponse: ResponseData<LocationsResponse> = response.data;

    if (status) {
      setResult(dataResponse.data);
    }

    return status;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};
