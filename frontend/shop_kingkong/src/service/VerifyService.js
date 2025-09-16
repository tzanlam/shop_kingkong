import axiosClient from "./AxiosConfig"

const VerifyService = {
    verify(email, otp, action) {
        return axiosClient.post(`verify?email=${email}/otp=${otp}/action=${action}`)
    }
}

export default VerifyService