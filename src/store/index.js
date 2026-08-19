import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import progressReducer from './slices/progressSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    progress: progressReducer,
  },
});
