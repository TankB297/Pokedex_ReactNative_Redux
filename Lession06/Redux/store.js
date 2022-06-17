import {configureStore} from '@reduxjs/toolkit';
import listItemReducer from './listItemSlice';

export const store = configureStore({
  reducer: {
    listItem: listItemReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
