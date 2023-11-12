import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
    const { userToken } = useSelector((state) => state.auth);
    return userToken ? <Navigate to={'/support/dashboard'} /> : children;
}
