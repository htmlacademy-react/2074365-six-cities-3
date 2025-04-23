import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '@/constants/constants.ts';

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
