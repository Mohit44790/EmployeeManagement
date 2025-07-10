import axios from "axios";
import { USER_API_END_POINT } from "../Redux/constants/backendapi";

// change password
export const resetPassword = async ({ old_password, new_password }) => {
    try {
        const token = sessionStorage.getItem("token");

        const formData = new URLSearchParams();
        formData.append("old_password", old_password);
        formData.append("new_password", new_password);

        const response = await axios.post(
            `${USER_API_END_POINT}/auth/reset-password`,
            formData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// reset password karne aala
export const forgotPassword = async (email) => {
    const formData = new URLSearchParams();
    formData.append("email", email);

    try {
        const response = await axios.post(
            `${USER_API_END_POINT}/auth/reset-password`,
            formData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}