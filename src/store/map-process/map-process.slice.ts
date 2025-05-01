import {MapProcess} from '@/types/state.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '@/constants/constants.ts';
import {Nullable} from 'vitest';

const initialState: MapProcess = {
  activeOfferId: null,
};

export const mapProcessSlice = createSlice({
  name: NameSpace.Map,
  initialState,
  reducers: {
    setActiveOfferId(state, action: PayloadAction<Nullable<string>>) {
      state.activeOfferId = action.payload;
    },
  },
});

export const {setActiveOfferId} = mapProcessSlice.actions;
