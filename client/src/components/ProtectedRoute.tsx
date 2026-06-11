// import { Navigate, Outlet } from "react-router-dom";
// import { useApp } from "../context/AppContext";

// export default function ProtectedRoute() {
//     const { token, loading } = useApp();

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-dark-900">
//                 <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
//             </div>
//         );
//     }

//     if (!token) {
//         return <Navigate to="/login" replace />;
//     }

//     return <Outlet />;
// }

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { token, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-900">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

