
const AuthService = {
    login: async (LoginRequest) => {
        try {
            const res = await axios.post("/auth/login", LoginRequest);
            setAccessToken(res.data.accessToken);
            return res.data;
        } catch (error) {
            throw error;
        }
    },
    logout: async (accountId) => {
        try {
            await axios.post(`/auth/logout/${accountId}`);
            clearAccessToken();
        } catch (error) {
            throw error;
        }
    },
    refresh: async () => {
        try {
            const res = await axios.post("/auth/refresh");
            setAccessToken(res.data.accessToken);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}