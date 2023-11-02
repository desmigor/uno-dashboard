import callAPI from "../../utils/api";
import { errorLogin, login } from "../slices/authSlice";

export const handleLoginAction = (username, password, type, navigate) => async (dispatch, getState) => {
    try {
        const payload = {
            username,
            password
        }

        const result = await callAPI('/api/auth/web/login/', 'POST', false, payload);
        const reduxPayload = {
            type,
            ac: result
        }

        dispatch(login(reduxPayload));
        navigate('/admin/dashboard');
    } catch (error) {
        console.log(error);
        const payload = {
            message: error.response.data.message,
            isPassword: error.response.data.message === "Please fill out the username." ? false : true
        }
        dispatch(errorLogin(payload));
    }
}
