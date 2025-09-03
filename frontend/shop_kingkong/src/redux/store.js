import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // Add your reducers here when you create them
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
