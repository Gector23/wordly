import { configureStore } from "@reduxjs/toolkit";

import { api } from "../api";
import analyzeReducer from "./slices/analyze";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    analyze: analyzeReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
