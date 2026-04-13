import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getRequestConfig } from '$libs/request/api.ts';
import { ResponseData } from '$libs/request/response';
import UserProfileResponse from '$libs/request/response/UserProfileResponse.ts';

export const getCurrentUser = async (
  root: AxiosInstance,
  setCurrentUser: (current: UserProfileResponse) => void,
) => {
  try {
    const response: AxiosResponse = await root.get(
      `/auth/user`,
      getRequestConfig(),
    );

    const status = [200, 201].includes(response.status);
    const data: ResponseData<UserProfileResponse> = response.data;
    const statusData = status && data.status == 'success';

    if (statusData) {
      setCurrentUser(data.data);
    }

    return status;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return false;
    }

    throw e;
  }
};
