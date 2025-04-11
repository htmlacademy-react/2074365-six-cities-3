import {createAction} from '@reduxjs/toolkit';
import {City, Offers} from '../types/offer';
import {Nullable} from 'vitest';

const setCity = createAction<City>('main/setCity');

const setSorting = createAction<string>('main/setSorting');

const setActiveOfferId = createAction<Nullable<string>>('map/setActiveOfferId');

const loadOffers = createAction<Offers>('data/loadOffers');

const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export {setCity, setSorting, setActiveOfferId, setDataLoadingStatus, loadOffers};
