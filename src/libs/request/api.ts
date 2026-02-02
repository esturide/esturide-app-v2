import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { baseURL } from '$libs/const/defaultURL.ts';

const requestRoot = axios.create({
  baseURL: `https://${baseURL}/`,
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
