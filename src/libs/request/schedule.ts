import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';
import ScheduleTravelData from '$libs/request/response/ScheduleTravelData.ts';
import { ResponseData } from '$libs/request/response';
import ScheduleState from '$libs/request/response/ScheduleState.ts';

export const requestScheduleTravel = async (
  root: AxiosInstance,
  request: ScheduleState,
) => {
  try {
    console.log(request);

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
