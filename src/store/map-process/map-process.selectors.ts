import {State} from '@/types/state';
import {NameSpace} from '@/constants/constants.ts';
import {Nullable} from 'vitest';

export const getActiveOfferId = (state: State): Nullable<string> => state[NameSpace.Map].activeOfferId;
