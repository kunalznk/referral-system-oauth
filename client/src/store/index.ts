import {  configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import { useSelect } from '@material-tailwind/react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
    reducer,
    middleware:(getDefaultMiddleware) => {
        return getDefaultMiddleware()
    },
  })

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = useDispatch<AppDispatch>
