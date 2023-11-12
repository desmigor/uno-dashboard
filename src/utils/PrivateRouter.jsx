import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export { PrivateRoute };

function PrivateRoute({ isAllowed , redirectTo ,children }) {
    const { userToken } = useSelector((state) => state.auth);

    if(!isAllowed){
        return <Navigate to={redirectTo} />
    }
    return userToken ? children : <Navigate to={'/support'} />
}
