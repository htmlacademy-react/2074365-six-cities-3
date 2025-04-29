import {CITIES} from '@/constants/constants.ts';

export const getRandomCity = () =>
  (CITIES[Math.floor(Math.random() * CITIES.length)]);
