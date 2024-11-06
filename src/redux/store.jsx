import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dataReducer from './dataSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
  },
});
