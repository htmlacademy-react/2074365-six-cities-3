import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {BASE_URL, TIMEOUT_SHOW_ERROR} from '@/constants/constants.ts';
import {StatusCodes} from 'http-status-codes';
import {getToken} from '@/services/token.ts';
import {toast} from 'react-toastify';


type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT_SHOW_ERROR,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data.message);
        toast.warn(detailMessage);
      }

      throw error;
    }
  );

  return api;
};
