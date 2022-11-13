// import useAuth from "../../hooks/useAuth"
import { useLocation, Navigate, Outlet } from "react-router-dom";

const iff = (condition, then, otherwise) => condition ? then : otherwise;

const LoginAuth = ({ allowedRoles }) => {
    // const { auth } = useAuth();
    const location = useLocation();

    let auth;
    if (localStorage.getItem("user") === "") auth = null;
    else auth = JSON.parse(localStorage.getItem("user"));

    return (

        (auth?.accessToken && auth?.email && auth?.id) 
            ? <Outlet />
            : iff(auth !== null,
                <Navigate to="/unauth" state={{ from: location }} replace />,
                <Navigate to="/login" state={{ from: location }} replace />)
    );
}

export default LoginAuth;