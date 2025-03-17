import {AppDispatch, State} from '../types/state.ts';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';


export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
