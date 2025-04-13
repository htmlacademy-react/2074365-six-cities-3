import axios, {AxiosInstance} from 'axios';
import {BASE_URL} from '@/constants/constants.ts';

export const createAPI = (): AxiosInstance => axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});
