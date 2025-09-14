import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';
import Location from '$libs/types/Location.ts';
import ScheduleResponse from '$libs/request/response/ScheduleResponse.ts';
import Seat from '$libs/types/Seats.ts';
import { ResponseData } from '$libs/request/response';

interface ScheduleRequest {
  readonly maxPassengers: number;
  readonly seats: Seat[];
  readonly a: string;
  readonly b: Location;
  readonly returnHome: boolean;
}

export const requestScheduleTravel = async (
  root: AxiosInstance,
  request: ScheduleRequest,
) => {
  try {
    const response: AxiosResponse = await root.post(
      `/schedule`,
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

export const requestCurrentScheduleTravel = async (
  root: AxiosInstance,
  setCurrentSchedule: (current: ScheduleResponse) => void,
) => {
  try {
    const response: AxiosResponse = await root.get(
      `/schedule/current`,
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);
    const data: ResponseData<ScheduleResponse> = response.data;
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
