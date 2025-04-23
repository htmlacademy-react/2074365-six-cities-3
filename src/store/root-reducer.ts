import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '@/constants/constants.ts';
import {mainDataSlice} from '@/store/main-data/main-data.slice.ts';
import {offerDataSlice} from '@/store/offer-data/offer-data.slice.ts';
import {commentsDataSlice} from '@/store/comments-data/comments-data.slice.ts';
import {mapProcessSlice} from '@/store/map-process/map-process.slice.ts';
import {userProcessSlice} from '@/store/user-process/user-process.slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.Main]: mainDataSlice.reducer,
  [NameSpace.Offer]: offerDataSlice.reducer,
  [NameSpace.Comments]: commentsDataSlice.reducer,
  [NameSpace.Map]: mapProcessSlice.reducer,
  [NameSpace.User]: userProcessSlice.reducer,
});
