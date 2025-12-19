

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-purple-200 flex justify-between">

      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">
          🍽 LocalChefBazaar
        </Link>
      </div>

     <Link to="/" className="btn btn-ghost">Home</Link>
       <Link to="/meals" className="btn btn-ghost">Meals</Link>

 {user && <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>}

     
      <div>
        {user ? (
          <div className="flex items-center gap-3">
    <img
      src={user.photoURL}
      className="w-8 h-8 rounded-full"
      alt="user"
    />
    <button onClick={logoutUser} className="btn btn-error btn-sm">
      Logout
    </button>
  </div>
        ) : (
          <>
            <Link className="btn btn-ghost" to="/login">Login</Link>
            <Link className="btn btn-ghost"  to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

