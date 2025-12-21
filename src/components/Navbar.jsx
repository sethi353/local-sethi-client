

// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logoutUser } = useContext(AuthContext);
//    const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="p-4 bg-purple-200 flex justify-between">

//       <div className="flex-1">
//         <Link to="/" className="text-xl font-bold text-primary">
//           🍽 LocalChefBazaar
//         </Link>
//       </div>

//      <Link to="/" className="btn btn-ghost">Home</Link>
//        <Link to="/meals" className="btn btn-ghost">Meals</Link>

//  {user && <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>}

     
//       <div>
//         {user ? (
//           <div className="flex items-center gap-3">
//     <img
//       src={user.photoURL}
//       className="w-8 h-8 rounded-full"
//       alt="user"
//     />
//     <button onClick={logoutUser} className="btn btn-error btn-sm">
//       Logout
//     </button>
//   </div>
//         ) : (
//           <>
//             <Link className="btn btn-ghost" to="/login">Login</Link>
//             <Link className="btn btn-ghost"  to="/register">Register</Link>
//           </>
//         )}
//       </div>

    

    


//     </nav>
//   );
// }








import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white p-4">
      <div className="max-w-6xl   px-4  mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-primary">
          🍽 LocalChefBazaar
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="btn btn-ghost">Home</Link>
          <Link to="/meals" className="btn btn-ghost">Meals</Link>
          {user && <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>}
        </div>

        {/* User/Auth Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <img src={user.photoURL} className="w-8 h-8 rounded-full" alt="user" />
              <button onClick={logoutUser} className="btn btn-error btn-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-ghost">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center ">
          <button onClick={() => setIsOpen(!isOpen)} className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2 items-center w-full px-4">
          <Link to="/" className="btn btn-ghost w-full">Home</Link>
          <Link to="/meals" className="btn btn-ghost w-full">Meals</Link>
          {user && <Link to="/dashboard" className="btn btn-ghost w-full">Dashboard</Link>}
          {user ? (
            <button onClick={logoutUser} className="btn btn-error w-full">Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost w-full">Login</Link>
              <Link to="/register" className="btn btn-ghost w-full">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}


