import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

const baseURL = 'https://api.esturide.com';

const requestRoot = axios.create({
  baseURL: baseURL,
});

const requestConfig: AxiosRequestConfig = {
  timeout: 12000,
  headers: {
    Accept: 'application/json',
  } as RawAxiosRequestHeaders,
};

export const getRequestRoot = () => requestRoot;

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
