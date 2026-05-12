import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './wishlistSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
