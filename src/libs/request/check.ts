import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';
import { ResponseData } from '$libs/request/response';
import CurrentSessionStatus from '$libs/types/CurrentSessionStatus.ts';
import UserRole from '$libs/types/UserRole.ts';

export interface UserStatusResponse {
  readonly session: CurrentSessionStatus;
  readonly role: UserRole;
}

export const findCurrentSession = async (
  root: AxiosInstance,
): Promise<UserStatusResponse> => {
  try {
    const response: AxiosResponse = await root.get(
      `/find/status`,
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);
    const dataResponse: ResponseData<UserStatusResponse> = response.data;

    if (status) {
      return dataResponse.data;
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        session: 'free',
        role: 'standard',
      };
    }

    throw e;
  }

  return {
    session: 'free',
    role: 'standard',
  };
};
