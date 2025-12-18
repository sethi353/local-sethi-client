



// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [role, setRole] = useState("user");
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("profile"); // track which tab is active
//   const [userReviews, setUserReviews] = useState([]);
//   const [userFavorites, setUserFavorites] = useState([]);


//   // 🔹 Redirect to home if logged out
//   useEffect(() => {
//     if (!user) {
//       navigate("/"); // redirect to home
//     }
//   }, [user, navigate]);

//   // 🔹 Fetch role
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
//             <button className="btn btn-ghost text-left">🏠 My Profile</button>
//             <button className="btn btn-ghost text-left">📦 My Orders</button>
//             <button className="btn btn-ghost text-left">📦 My Review</button>
//             <button className="btn btn-ghost text-left">📦 My Favourites</button>

            
//           </div>
//         )}

//         {/* CHEF MENU */}
//         {role === "chef" && (
//           <div className="flex flex-col gap-3">
//             <button className="btn btn-ghost text-left">🍽 My Profile</button>
//             <button className="btn btn-ghost text-left">📋 My Meals</button>
//             <button className="btn btn-ghost text-left">🛒  Orders Requests </button>

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
//             <button className="btn btn-ghost text-left">My Profile</button>
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
//               ✅ Manage Requests
//             </button>
//             <button className="btn btn-ghost text-left">Perform Statistics</button>
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
  const [activeTab, setActiveTab] = useState("profile"); // Track which tab is active
  const [userReviews, setUserReviews] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const navigate = useNavigate();

  // 🔹 Redirect to home if not logged in
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  // 🔹 Fetch user role
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/users/${user.email}`)
        .then(res => setRole(res.data.role))
        .catch(err => console.log(err));
    }
  }, [user]);

  // 🔹 Fetch user reviews and favorites
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/reviews/user/${user.email}`)
        .then(res => setUserReviews(res.data))
        .catch(err => console.log(err));

      axios
        .get(`http://localhost:5000/favorites/user/${user.email}`)
        .then(res => setUserFavorites(res.data))
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
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("profile")}>🏠 My Profile</button>
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("orders")}>📦 My Orders</button>
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("reviews")}>📦 My Reviews</button>
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("favorites")}>📦 My Favourites</button>
          </div>
        )}

        {/* CHEF MENU */}
        {role === "chef" && (
          <div className="flex flex-col gap-3">
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("profile")}>🍽 My Profile</button>
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("meals")}>📋 My Meals</button>
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("orders")}>🛒 Orders Requests</button>
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
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("profile")}>My Profile</button>
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
              ✅ Manage Requests
            </button>
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("stats")}>
              Perform Statistics
            </button>
          </div>
        )}
      </aside>

      {/* 🔹 RIGHT CONTENT */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {user?.displayName || user?.email}
        </h1>
        <p className="text-gray-600 mb-4">Role: {role}</p>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <p><b>Name:</b> {user?.displayName}</p>
            <p><b>Email:</b> {user?.email}</p>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <p>Orders content coming soon...</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
            {userReviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              userReviews.map((r, i) => (
                <div key={i} className="border p-4 rounded mb-3">
                  <p><b>Meal ID:</b> {r.foodId}</p>
                  <p><b>Rating:</b> {r.rating}</p>
                  <p>{r.comment}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "favorites" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Favourites</h2>
            {userFavorites.length === 0 ? (
              <p>No favorites yet.</p>
            ) : (
              userFavorites.map((f, i) => (
                <div key={i} className="border p-4 rounded mb-3">
                  <p><b>Meal Name:</b> {f.mealName}</p>
                  <p><b>Chef:</b> {f.chefName}</p>
                  <p><b>Price:</b> ৳{f.price}</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
