import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./authHelper";

function ProtectedRoute({children}) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoute
