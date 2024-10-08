import callAPI from "../../utils/api";
import { errorLogin, login, startLoading } from "../slices/authSlice";

export const handleLoginAction = (username, password, type, navigate) => async (dispatch, getState) => {
    try {
        dispatch(startLoading());
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
        navigate(type === 'admin' ? '/admin/dashboard' : '/support/dashboard');
    } catch (error) {
        const payload = {
            message: error.response.data.message,
            isPassword: error.response.data.message === "Please fill out the username." ? false : true
        }
        dispatch(errorLogin(payload));
    }
}
