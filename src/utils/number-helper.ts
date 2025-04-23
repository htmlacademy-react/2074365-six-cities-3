import {Cities} from '@/constants/constants.ts';

export const getRandomCity = () =>
  (Cities[Math.floor(Math.random() * Cities.length)]);
