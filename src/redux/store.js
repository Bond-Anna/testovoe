import { configureStore } from '@reduxjs/toolkit';
import homeSlice from '../redux/homeSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      homeSlice,
    },
  });
}

const store = makeStore();

export default store;
