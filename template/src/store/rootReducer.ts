import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import appReducer  from './slices/appSlice';
import { apiSlice } from '@/services/api/endpoints';

export const rootReducer = combineReducers({
  auth: authReducer,
  app:  appReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
