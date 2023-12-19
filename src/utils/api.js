import { useSelector } from "react-redux";
import axios from "axios";
import { store } from "../redux/store";
import { update_token } from "../redux/slices/authSlice";

export const API_URL = "https://uno.dev.smart-maple.com";

const getAuthToken = () => {
  const { userToken, refreshToken } = store.getState().auth;
  return { userToken, refreshToken };
};

const callAPI = async (
  endpoint,
  method,
  isAuthenticated = true,
  data = null
) => {
  try {
    var config = {
      method,
      // url: `${API_URL}${endpoint}`, // Treat all requests as new to prevent caching
      url : `${API_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}_=${new Date().getTime()}`,
      // url : `${API_URL}${endpoint}`,
      data,
      cache: 'no-cache',
    };

    if (isAuthenticated) {
      const token = getAuthToken().userToken;

      if (!token) {
        throw new Error("No token available");
      }

      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    // prevent caching
    // config.headers = {
    //   ...config.headers,
    //   "access-control-allow-origin": "*",
    //   "Cache-Control": "no-cache",
    //   // Pragma: "no-cache",
    //   Expires: "0",
    // };

    const response = await axios(config);

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        // Attempt to refresh the token
        const res = await axios.post(
          API_URL + "/api/auth/login/refresh/",
          {
            refresh: getAuthToken().refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${getAuthToken().userToken}`,
            },
          }
        );

        // If the refresh is successful, update the access token
        store.dispatch(update_token(res.data.access));

        // Retry the original request with the new token
        return callAPI(endpoint, method, isAuthenticated, data);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);

        // Redirect to the login page on token refresh failure
        window.location.href = "/support";

        throw refreshError;
      }
    }
    throw error;
  }
};

export default callAPI;
