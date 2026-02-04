import { combineReducers, configureStore } from "@reduxjs/toolkit";
import exampleSlice from "./example/exampleSlice";
import authSlice from "./auth/authSlice";
import { authApi } from "@/services/auth";

const rootReducer = combineReducers({
  example: exampleSlice,
  // auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
