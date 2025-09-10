import axios from "axios";

const axiosRaw = axios.create({
  baseURL: "http://localhost:8081/",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const AuthService = {
  login(loginRequest) {
    return axiosRaw.post("auth/login", loginRequest);
  },
  logout(accountId) {
    return axiosRaw.post(`auth/logout/${accountId}`);
  },
  refresh() {
    return axiosRaw.post("auth/refresh");
  },
};

export default AuthService;
