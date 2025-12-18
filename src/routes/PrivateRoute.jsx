// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) return <p className="text-center mt-20">Loading...</p>;
//   if (!user) return <Navigate to="/login" replace />;

//   return children;
// };

// export default PrivateRoute;

import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // ⏳ wait until Firebase finishes checking auth
  if (loading) {
    return <p className="text-center mt-20">Checking authentication...</p>;
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ logged in
  return children;
}
