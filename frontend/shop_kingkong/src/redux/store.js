import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import supportReducer from "./slices/SupportSlice"
import authReducer from "./slices/AuthSlice";
import accountReducer from "./slices/AccountSlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  support: supportReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
