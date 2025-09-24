import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';
import ScheduleTravelData from '$libs/types/data/ScheduleTravelData.ts';
import { ResponseData } from '$libs/request/response';
import ScheduleRequest from '$libs/request/request/ScheduleRequest.ts';

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
    genderFilter: request.genderFilter,
    startDate: request.startDate.toISOString(),
    returnHome: request.returnHome,
  };

  try {
    const response: AxiosResponse = await root.post(
      `/schedule/`,
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
  setCurrentSchedule: (current: ScheduleTravelData) => void,
) => {
  try {
    const response: AxiosResponse = await root.get(
      `/schedule/current`,
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);
    const data: ResponseData<ScheduleTravelData> = response.data;
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
      `/schedule/update`,
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
