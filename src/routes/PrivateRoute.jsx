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

import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/login" />;
  }

  // Logged in → render children
  return children;
}

