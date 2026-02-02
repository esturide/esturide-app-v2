import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getHeaderConfig, getRequestConfig } from '$libs/request/api.ts';
import ScheduleTravelInterface from '$libs/types/interface/ScheduleTravelInterface.ts';
import { ResponseData } from '$libs/request/response';
import ScheduleRequest from '$libs/request/request/ScheduleRequest.ts';
import ScheduleFilterRequest from '$libs/request/request/ScheduleFilterRequest.ts';

export interface ScheduleOption {
  readonly terminate?: boolean;
  readonly cancel?: boolean;
  readonly starting?: Date;
}

export const requestScheduleTravel = async (
  root: AxiosInstance,
  request: ScheduleRequest,
) => {
  const dataRequest = {
    seats: request.seats,
    origin: request.origin,
    destination: request.destination,
    price: Math.ceil(request.price),
    genders: request.genderFilter,
    starting: request.startDate.toISOString(),
    returnHome: request.returnHome,
    waypoints: [''],
  };

  try {
    const response: AxiosResponse = await root.post(
      `/travel/`,
      dataRequest,
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

export const requestCurrentScheduleTravel = async (
  root: AxiosInstance,
  setCurrentSchedule: (current: ScheduleTravelInterface) => void,
) => {
  try {
    const response: AxiosResponse = await root.get(
      `/travel/current/`,
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);
    const data: ResponseData<ScheduleTravelInterface> = response.data;
    const statusData = status && data.status == 'success';

    if (!status) {
      return false;
    }

    if (statusData) {
      setCurrentSchedule(data.data);
    }

    return statusData;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};

export const updateCurrentSchedule = async (
  root: AxiosInstance,
  request: ScheduleOption,
) => {
  try {
    const response: AxiosResponse = await root.post(
      `/travel/update`,
      {
        terminate: request.terminate,
        cancel: request.cancel,
        starting: request.starting ? request.starting.toISOString() : undefined,
      },
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

export const filterSchedule = async (
  root: AxiosInstance,
  request: ScheduleFilterRequest,
  setResults: (current: ScheduleTravelInterface[]) => void,
) => {
  try {
    const response: AxiosResponse = await root.get(`/schedule/search`, {
      params: {
        terminate: request.terminate,
        cancel: request.cancel,
        starting: request.starting ? request.starting.toISOString() : undefined,
        terminated: request.terminated
          ? request.terminated.toISOString()
          : undefined,
        min_price: request.minPrice,
        max_price: request.maxPrice,
      },
      headers: getHeaderConfig(),
    });

    const status = [200, 201].includes(response.status);
    const data: ResponseData<ScheduleTravelInterface[]> = response.data;
    const statusData = status && data.status == 'success';

    if (!status) {
      return false;
    }

    if (statusData) {
      setResults(data.data);
    }

    return statusData;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};
