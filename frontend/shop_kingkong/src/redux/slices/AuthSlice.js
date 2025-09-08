import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    accountId: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.accountId = action.payload.accountId || null;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.accountId = null;
    },
  },
});

export const { setAuth, clearAuth } = AuthSlice.actions;
export default AuthSlice.reducer;