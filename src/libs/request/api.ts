import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

const baseURL = 'https://api.esturide.com';

const requestRoot = axios.create({
  baseURL: baseURL,
});

const requestUserManagement = axios.create({
  baseURL: `${baseURL}/v1/user-management`,
});

const requestTravelMatchNetwork = axios.create({
  baseURL: `${baseURL}/v1/travel-match-network`,
});

const requestConfig: AxiosRequestConfig = {
  timeout: 12000,
  headers: {
    Accept: 'application/json',
  } as RawAxiosRequestHeaders,
};

export const getRequestRoot = () => requestRoot;

export const getUserManagement = () => requestUserManagement;

export const getTravelMatchNetwork = () => requestTravelMatchNetwork;

export const getRequestConfig = () => {
  if (requestConfig !== undefined) {
    return requestConfig;
  }

  throw new Error('Request config not initialize.');
};

export const getHeaderConfig = () => {
  const config = getRequestConfig();

  if (config.headers !== undefined) {
    return config.headers;
  }

  throw new Error('Header not found.');
};

export const configHeaderAuthToken = (accessToken: string) => {
  const header = getHeaderConfig();

  header.Authorization = `Bearer ${accessToken}`;
};
