// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [role, setRole] = useState("user");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       axios.get(`http://localhost:5000/users/${user.email}`)
//         .then(res => setRole(res.data.role))
//         .catch(err => console.log(err));
//     }
//   }, [user]);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl mb-4">Dashboard</h1>
//       <p>Welcome, {user?.displayName || user?.email}</p>
//       <p>Your role: {role}</p>

//       <div className="mt-4 flex flex-col gap-2">
//         {role === "user" && (
//           <>
//             <button>Home</button>
//             <button>My Orders</button>
//             <button onClick={async () => {
//         await axios.post("http://localhost:5000/role-request", {
//           userName: user.displayName,
//           userEmail: user.email,
//           requestType: "chef",
//         });
//         alert("Chef request sent!");
//       }}
//     >Be a Chef</button>
//           </>
//         )}
//         {role === "chef" && (
//           <>
//             <button className="btn btn-ghost"> Chef Home</button>
//             <button className="btn btn-ghost">My Meals</button>
//             <button className="btn btn-ghost">Orders</button>
//             {/* ADD MEAL FORM */}
//    <button
//       className="btn btn-primary mt-2"
//       onClick={() => navigate("/dashboard/add-meal")}
//     >
//       Add Meal
//     </button>
//           </>
//         )}
//         {role === "admin" && (
//           <>
//             <button
//       className="btn btn-ghost"
//       onClick={() => navigate("/dashboard/admin-users")}
//     >
//       Manage Users
//     </button>
//     <button
//       className="btn btn-ghost"
//       onClick={() => navigate("/dashboard/admin-requests")}
//     >
//       Approve Chefs
//     </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


//  import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [role, setRole] = useState("user");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:5000/users/${user.email}`)
//         .then(res => setRole(res.data.role))
//         .catch(err => console.log(err));
//     }
//   }, [user]);

//   return (
//     <div className="min-h-screen flex">
//       {/* 🔹 LEFT SIDEBAR */}
//       <aside className="w-64 bg-gray-900 text-white p-4">
//         <h2 className="text-xl font-bold mb-6">Dashboard</h2>

//         {/* USER MENU */}
//         {role === "user" && (
//           <div className="flex flex-col gap-3">
//             <button className="btn btn-ghost text-left">🏠 Home</button>
//             <button className="btn btn-ghost text-left">📦 My Orders</button>

//             <button
//               className="btn btn-primary mt-4"
//               onClick={async () => {
//                 await axios.post("http://localhost:5000/role-request", {
//                   userName: user.displayName,
//                   userEmail: user.email,
//                   requestType: "chef",
//                 });
//                 alert("Chef request sent!");
//               }}
//             >
//               👨‍🍳 Be a Chef
//             </button>
//           </div>
//         )}

//         {/* CHEF MENU */}
//         {role === "chef" && (
//           <div className="flex flex-col gap-3">
//             <button className="btn btn-ghost text-left">🍽 Chef Home</button>
//             <button className="btn btn-ghost text-left">📋 My Meals</button>
//             <button className="btn btn-ghost text-left">🛒 Orders</button>

//             <button
//               className="btn btn-primary mt-4"
//               onClick={() => navigate("/dashboard/add-meal")}
//             >
//               ➕ Add Meal
//             </button>
//           </div>
//         )}

//         {/* ADMIN MENU */}
//         {role === "admin" && (
//           <div className="flex flex-col gap-3">
//             <button
//               className="btn btn-ghost text-left"
//               onClick={() => navigate("/dashboard/admin-users")}
//             >
//               👥 Manage Users
//             </button>

//             <button
//               className="btn btn-ghost text-left"
//               onClick={() => navigate("/dashboard/admin-requests")}
//             >
//               ✅ Approve Chefs
//             </button>
//           </div>
//         )}
//       </aside>

//       {/* 🔹 RIGHT CONTENT */}
//       <main className="flex-1 p-6 bg-gray-100">
//         <h1 className="text-3xl font-bold mb-2">
//           Welcome, {user?.displayName || user?.email}
//         </h1>
//         <p className="text-gray-600">Role: {role}</p>

//         {/* Later you can put <Outlet /> here */}
//       </main>
//     </div>
//   );
// }




import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  // 🔹 Redirect to home if logged out
  useEffect(() => {
    if (!user) {
      navigate("/"); // redirect to home
    }
  }, [user, navigate]);

  // 🔹 Fetch role
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/users/${user.email}`)
        .then(res => setRole(res.data.role))
        .catch(err => console.log(err));
    }
  }, [user]);

  return (
    <div className="min-h-screen flex">
      {/* 🔹 LEFT SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        {/* USER MENU */}
        {role === "user" && (
          <div className="flex flex-col gap-3">
            <button className="btn btn-ghost text-left">🏠 Home</button>
            <button className="btn btn-ghost text-left">📦 My Orders</button>

            <button
              className="btn btn-primary mt-4"
              onClick={async () => {
                await axios.post("http://localhost:5000/role-request", {
                  userName: user.displayName,
                  userEmail: user.email,
                  requestType: "chef",
                });
                alert("Chef request sent!");
              }}
            >
              👨‍🍳 Be a Chef
            </button>
          </div>
        )}

        {/* CHEF MENU */}
        {role === "chef" && (
          <div className="flex flex-col gap-3">
            <button className="btn btn-ghost text-left">🍽 Chef Home</button>
            <button className="btn btn-ghost text-left">📋 My Meals</button>
            <button className="btn btn-ghost text-left">🛒 Orders</button>

            <button
              className="btn btn-primary mt-4"
              onClick={() => navigate("/dashboard/add-meal")}
            >
              ➕ Add Meal
            </button>
          </div>
        )}

        {/* ADMIN MENU */}
        {role === "admin" && (
          <div className="flex flex-col gap-3">
            <button
              className="btn btn-ghost text-left"
              onClick={() => navigate("/dashboard/admin-users")}
            >
              👥 Manage Users
            </button>

            <button
              className="btn btn-ghost text-left"
              onClick={() => navigate("/dashboard/admin-requests")}
            >
              ✅ Approve Chefs
            </button>
          </div>
        )}
      </aside>

      {/* 🔹 RIGHT CONTENT */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {user?.displayName || user?.email}
        </h1>
        <p className="text-gray-600">Role: {role}</p>

        {/* Later you can put <Outlet /> here */}
      </main>
    </div>
  );
}
