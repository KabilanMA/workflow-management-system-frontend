// import useAuth from "../../hooks/useAuth"
import { useLocation, Navigate, Outlet } from "react-router-dom";

const iff = (condition, then, otherwise) => condition ? then : otherwise;

const RequireAuth = ({ allowedRoles }) => {
    // const { auth } = useAuth();
    const location = useLocation();

    let auth;
    if (localStorage.getItem("user") === "") auth = null;
    else auth = JSON.parse(localStorage.getItem("user"));
    // console.log("TTTTTTTTTT", localStorage.getItem("user"))
    // console.log(auth?.roles, allowedRoles)

    // console.log(auth?.roles.find(role => allowedRoles?.includes(role)))

    return (
        // auth?.roles?.find(role => allowedRoles?.includes(role))
        //     ? <Outlet />
        //     // : auth?.user
        //     : localStorage.getItem("user") === null 
        //         ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        //         : <Navigate to="/login" state={{ from: location }} replace />

        auth?.roles.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : iff(auth !== null,
                <Navigate to="/unauth" state={{ from: location }} replace />,
                <Navigate to="/login" state={{ from: location }} replace />)
        // : auth !== null
        //     ? <Navigate to="/unauth" state={{ from: location }} replace />
        //     : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;