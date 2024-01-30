import { Navigate, Outlet } from "react-router-dom";

const isLogin = !!localStorage.getItem("");

const PrivateRoute = () => {
    return isLogin ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoute;