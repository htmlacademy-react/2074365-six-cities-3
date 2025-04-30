import {State} from '@/types/state';
import {NameSpace} from '@/constants/constants.ts';

export const getActiveOfferId = (state: State): string | null => state[NameSpace.Map].activeOfferId;
