import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, isLoggedIn, loading } = useUser();

    // wait until auth check is complete
    if (loading) {
        return <div>Loading...</div>;
    }

    // not logged in
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // role check
    if (!allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default RoleProtectedRoute;