import { store } from "../redux/store";
import axios from "axios";
import AuthService from "./AuthService";
import { setAuth, clearAuth } from "../redux/slices/AuthSlice";

const API_BASE_URL = "http://localhost:8081/";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const res = await AuthService.refresh();
        const newAccessToken = res.accessToken;
        store.dispatch(setAuth({ accessToken: newAccessToken, accountId: res.accountId }));
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(error.config);
      } catch {
        store.dispatch(clearAuth());
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;