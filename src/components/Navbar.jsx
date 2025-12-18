// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logoutUser } = useContext(AuthContext);

//   return (
//     <div className="navbar bg-base-100 shadow px-6">
//       <div className="flex-1">
//         <Link to="/" className="text-xl font-bold text-primary">
//           🍽 LocalChefBazaar
//         </Link>
//       </div>

//       <div className="flex gap-4 items-center">
//         <Link to="/" className="btn btn-ghost">Home</Link>
//         <Link to="/meals" className="btn btn-ghost">Meals</Link>

//         {user && <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>}

//         {!user ? (
//           <>
//             <Link to="/login" className="btn btn-outline">Login</Link>
//             <Link to="/register" className="btn btn-primary">Register</Link>
//           </>
//         ) : (
//           <>
//             <img
//               src={user.photoURL}
//               className="w-10 h-10 rounded-full"
//               alt="profile"
//             />
//             <button onClick={logoutUser} className="btn btn-error btn-sm">
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

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

