import axios from "axios"

const API_BASE_URL = "http://localhost:8081"
const ACCESS_TOKEN_KEY = "accessToken"

let accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY) || null

export const setAccessToken = (token) => {
    accessToken = token
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const clearAccessToken = () =>{
    accessToken = null
    sessionStorage.removeItem(ACCESS_TOKEN_KEY)
}

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

axiosClient.interceptors.request.use(
  (config) => {
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
        const res = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(error.config);
      } catch (err) {
        clearAccessToken();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;