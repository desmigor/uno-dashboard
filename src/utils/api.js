import { useSelector } from "react-redux";
import axios from "axios";
import { store } from "../redux/store";

export const API_URL = 'https://uno.dev.smart-maple.com';

const getAuthToken = () => {
    const { userToken } = store.getState().auth;
    return userToken;
}

const callAPI = async (endpoint, method, isAuthenticated = true, data = null) => {
    try {
        const config = {
            method,
            url: API_URL + endpoint,
            data,
        }

        if(isAuthenticated) {
            const token = getAuthToken();

            if(!token) {
                throw new Error('No token available');
            }

            config.headers = {
                Authorization: token,
            };
        }

        const response = await axios(config);

        return response.data;

    } catch (error) {
        console.error('Error making API request:', error);
        throw error;
    }
}

export default callAPI;
