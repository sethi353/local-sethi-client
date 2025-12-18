// import { NavLink } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import useRole from "../hooks/useRole";

// const DashboardSidebar = () => {
//   const { user } = useContext(AuthContext);
//   const { role } = useRole(user?.email);

//   return (
//     <div>
//       <NavLink to="/dashboard" className="block mb-2">
//         Dashboard Home
//       </NavLink>

//       {role === "user" && (
//         <NavLink to="/dashboard/orders" className="block mb-2">
//           My Orders
//         </NavLink>
//       )}

//       {role === "chef" && (
//         <>
//           <NavLink to="/dashboard/add-meal" className="block mb-2">
//             Add Meal
//           </NavLink>
//           <NavLink to="/dashboard/my-meals" className="block mb-2">
//             My Meals
//           </NavLink>
//         </>
//       )}

//       {role === "admin" && (
//         <NavLink to="/dashboard/manage-users" className="block mb-2">
//           Manage Users
//         </NavLink>
//       )}
//     </div>
//   );
// };

// export default DashboardSidebar;
