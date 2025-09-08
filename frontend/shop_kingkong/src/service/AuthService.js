import { store } from "../redux/store";
import axiosClient from "./AxiosConfig";
import { setAuth, clearAuth } from "../redux/slices/AuthSlice";

const AuthService = {
  login: async (LoginRequest) => {
    const res = await axiosClient.post("auth/login", LoginRequest);
    store.dispatch(setAuth({ accessToken: res.data.accessToken, accountId: res.data.accountId }));
    return res.data;
  },
  logout: async (accountId) => {
    await axiosClient.post(`auth/logout/${accountId}`);
    store.dispatch(clearAuth());
  },
  refresh: async () => {
    const res = await axiosClient.post("auth/refresh");
    store.dispatch(setAuth({ accessToken: res.data.accessToken, accountId: res.data.accountId }));
    return res.data;
  },
};

export default AuthService;