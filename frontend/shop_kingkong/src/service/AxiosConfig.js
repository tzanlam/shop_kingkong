import axios from "axios";
import { store } from "../redux/store";
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
    const state = store.getState();
    const accessToken = state.auth.accessToken;

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
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await AuthService.refresh();
        const { accessToken: newAccessToken, accountId } = res.data;

        store.dispatch(setAuth({ accessToken: newAccessToken, accountId }));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        store.dispatch(clearAuth());
        window.location.href = "/";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
