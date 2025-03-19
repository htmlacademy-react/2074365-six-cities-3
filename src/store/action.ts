import {createAction} from '@reduxjs/toolkit';
import {City} from '../types/offer';
import {Nullable} from 'vitest';

const setCity = createAction<City>('main/setCity');

const setSorting = createAction<string>('main/setSorting');

const setActiveOfferId = createAction<Nullable<string>>('map/setActiveOfferId');

export {setCity, setSorting, setActiveOfferId};
