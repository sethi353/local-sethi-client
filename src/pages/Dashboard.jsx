
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [role, setRole] = useState("user");
//   const [activeTab, setActiveTab] = useState("profile"); 
//   const [userReviews, setUserReviews] = useState([]);
//   const [userFavorites, setUserFavorites] = useState([]);
//   const navigate = useNavigate();

//   // Redirect to home if not logged in
//   useEffect(() => {
//     if (!user) navigate("/");
//   }, [user, navigate]);

//   // Fetch user role
//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:5000/users/${user.email}`)
//         .then(res => setRole(res.data.role))
//         .catch(err => console.log(err));
//     }
//   }, [user]);

//   // Fetch user reviews and favorites
//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:5000/reviews/user/${user.email}`)
//         .then(res => setUserReviews(res.data))
//         .catch(err => console.log(err));

//       axios
//         .get(`http://localhost:5000/favorites/user/${user.email}`)
//         .then(res => setUserFavorites(res.data))
//         .catch(err => console.log(err));
//     }
//   }, [user]);

//   // Delete review
//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!"
//     });

//     if (confirm.isConfirmed) {
//       const res = await axios.delete(`http://localhost:5000/reviews/${id}`);
//       if (res.data.success) {
//         setUserReviews(userReviews.filter(r => r._id !== id));
//         Swal.fire("Deleted!", "Your review has been deleted.", "success");
//       }
//     }
//   };

//   // Update review
//   const handleUpdate = async (review) => {
//     const { value: formValues } = await Swal.fire({
//       title: 'Update Review',
//       html:
//         `<input id="swal-input1" class="swal2-input" type="number" min="1" max="5" placeholder="Rating" value="${review.rating}">` +
//         `<textarea id="swal-input2" class="swal2-textarea" placeholder="Comment">${review.comment}</textarea>`,
//       focusConfirm: false,
//       preConfirm: () => {
//         return {
//           rating: Number(document.getElementById('swal-input1').value),
//           comment: document.getElementById('swal-input2').value
//         };
//       }
//     });

//     if (formValues) {
//       const res = await axios.put(`http://localhost:5000/reviews/${review._id}`, formValues);
//       if (res.data.success) {
//         setUserReviews(userReviews.map(r => r._id === review._id ? { ...r, ...formValues } : r));
//         Swal.fire("Updated!", "Your review has been updated.", "success");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* LEFT SIDEBAR */}
//       <aside className="w-64 bg-gray-900 text-white p-4">
//         <h2 className="text-xl font-bold mb-6">Dashboard</h2>

//         {/* USER MENU */}
//         {role === "user" && (
//           <div className="flex flex-col gap-3">
//             <button className="btn btn-ghost text-left" onClick={() => setActiveTab("profile")}>🏠 My Profile</button>
//             <button className="btn btn-ghost text-left" onClick={() => setActiveTab("orders")}>📦 My Orders</button>
//             <button className="btn btn-ghost text-left" onClick={() => setActiveTab("reviews")}>📦 My Reviews</button>
//             <button className="btn btn-ghost text-left" onClick={() => setActiveTab("favorites")}>📦 My Favourites</button>
//           </div>
//         )}

//         {/* CHEF MENU */}
//         {role === "chef" && (
//           <div className="flex flex-col gap-3">
//             <button className="btn btn-ghost text-left" onClick={() => setActiveTab("profile")}>🍽 My Profile</button>
//             <button className="btn btn-ghost text-left" onClick={() => setActiveTab("meals")}>📋 My Meals</button>
//             <button className="btn btn-ghost text-left" onClick={() => setActiveTab("orders")}>🛒 Orders Requests</button>
//             <button className="btn btn-primary mt-4" onClick={() => navigate("/dashboard/add-meal")}>➕ Add Meal</button>
//           </div>
//         )}

//         {/* ADMIN MENU */}
//         {role === "admin" && (
//           <div className="flex flex-col gap-3">
//             <button className="btn btn-ghost text-left" onClick={() => setActiveTab("profile")}>My Profile</button>
//             <button className="btn btn-ghost text-left" onClick={() => navigate("/dashboard/admin-users")}>👥 Manage Users</button>
//             <button className="btn btn-ghost text-left" onClick={() => navigate("/dashboard/admin-requests")}>✅ Manage Requests</button>
//             <button className="btn btn-ghost text-left" onClick={() => setActiveTab("stats")}>Perform Statistics</button>
//           </div>
//         )}
//       </aside>

//       {/* RIGHT CONTENT */}
//       <main className="flex-1 p-6 bg-gray-100">
//         <h1 className="text-3xl font-bold mb-2">
//           Welcome, {user?.displayName || user?.email}
//         </h1>
//         <p className="text-gray-600 mb-4">Role: {role}</p>

//         {/* Tab Content */}
//         {activeTab === "profile" && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">My Profile</h2>
//             <p><b>Name:</b> {user?.displayName}</p>
//             <p><b>Email:</b> {user?.email}</p>
//           </div>
//         )}

//         {activeTab === "orders" && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">My Orders</h2>
//             <p>Orders content coming soon...</p>
//           </div>
//         )}

//         {activeTab === "reviews" && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
//             {userReviews.length === 0 ? (
//               <p>No reviews yet.</p>
//             ) : (
//               userReviews.map((r) => (
//                 <div key={r._id} className="border p-4 rounded mb-3">
//                   <p><b>Meal Name:</b> {r.mealName}</p>
//                   <p><b>Rating:</b> {r.rating}</p>
//                   <p>{r.comment}</p>
//                   <div className="mt-2 flex gap-2">
//                     <button className="btn btn-sm btn-error" onClick={() => handleDelete(r._id)}>Delete</button>
//                     <button className="btn btn-sm btn-warning" onClick={() => handleUpdate(r)}>Update</button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         {activeTab === "favorites" && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">My Favourites</h2>
//             {userFavorites.length === 0 ? (
//               <p>No favorites yet.</p>
//             ) : (
//               userFavorites.map((f, i) => (
//                 <div key={i} className="border p-4 rounded mb-3">
//                   <p><b>Meal Name:</b> {f.mealName}</p>
//                   <p><b>Chef:</b> {f.chefName}</p>
//                   <p><b>Price:</b> ৳{f.price}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

































import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("user");
  const [activeTab, setActiveTab] = useState("profile");
  const [userReviews, setUserReviews] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const navigate = useNavigate();

  // Redirect to home if not logged in
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  // Fetch user role
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/users/${user.email}`)
        .then(res => setRole(res.data.role))
        .catch(err => console.log(err));
    }
  }, [user]);

  // Fetch user reviews and favorites
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

  // Delete review
  const handleDeleteReview = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
      const res = await axios.delete(`http://localhost:5000/reviews/${id}`);
      if (res.data.success) {
        setUserReviews(userReviews.filter(r => r._id !== id));
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
      }
    }
  };

  // Update review
  const handleUpdateReview = async (review) => {
    const { value: formValues } = await Swal.fire({
      title: 'Update Review',
      html:
        `<input id="swal-input1" class="swal2-input" type="number" min="1" max="5" placeholder="Rating" value="${review.rating}">` +
        `<textarea id="swal-input2" class="swal2-textarea" placeholder="Comment">${review.comment}</textarea>`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          rating: Number(document.getElementById('swal-input1').value),
          comment: document.getElementById('swal-input2').value
        };
      }
    });

    if (formValues) {
      const res = await axios.put(`http://localhost:5000/reviews/${review._id}`, formValues);
      if (res.data.success) {
        setUserReviews(userReviews.map(r => r._id === review._id ? { ...r, ...formValues } : r));
        Swal.fire("Updated!", "Your review has been updated.", "success");
      }
    }
  };

  // Delete favorite meal
  const handleDeleteFavorite = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be removed from your favorites!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!"
    });

    if (confirm.isConfirmed) {
      const res = await axios.delete(`http://localhost:5000/favorites/${id}`);
      if (res.data.success) {
        setUserFavorites(userFavorites.filter(f => f._id !== id));
        Swal.fire("Removed!", "Meal removed from favorites successfully.", "success");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        {role === "user" && (
          <div className="flex flex-col gap-3">
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("profile")}>🏠 My Profile</button>
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("orders")}>📦 My Orders</button>
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("reviews")}>📦 My Reviews</button>
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("favorites")}>📦 My Favourites</button>
          </div>
        )}

        {role === "chef" && (
          <div className="flex flex-col gap-3">
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("profile")}>🍽 My Profile</button>
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("meals")}>📋 My Meals</button>
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("orders")}>🛒 Orders Requests</button>
            <button className="btn btn-primary mt-4" onClick={() => navigate("/dashboard/add-meal")}>➕ Add Meal</button>
          </div>
        )}

        {role === "admin" && (
          <div className="flex flex-col gap-3">
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("profile")}>My Profile</button>
            <button className="btn btn-ghost text-left" onClick={() => navigate("/dashboard/admin-users")}>👥 Manage Users</button>
            <button className="btn btn-ghost text-left" onClick={() => navigate("/dashboard/admin-requests")}>✅ Manage Requests</button>
            <button className="btn btn-ghost text-left" onClick={() => setActiveTab("stats")}>Perform Statistics</button>
          </div>
        )}
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.displayName || user?.email}</h1>
        <p className="text-gray-600 mb-4">Role: {role}</p>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <p><b>Name:</b> {user?.displayName}</p>
            <p><b>Email:</b> {user?.email}</p>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <p>Orders content coming soon...</p>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
            {userReviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              userReviews.map(r => (
                <div key={r._id} className="border p-4 rounded mb-3">
                  <p><b>Meal Name:</b> {r.mealName}</p>
                  <p><b>Rating:</b> {r.rating}</p>
                  <p>{r.comment}</p>
                  <div className="mt-2 flex gap-2">
                    <button className="btn btn-sm btn-error" onClick={() => handleDeleteReview(r._id)}>Delete</button>
                    <button className="btn btn-sm btn-warning" onClick={() => handleUpdateReview(r)}>Update</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Favourites</h2>
            {userFavorites.length === 0 ? (
              <p>No favorites yet.</p>
            ) : (
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Meal Name</th>
                    <th className="border px-4 py-2">Chef Name</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Date Added</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userFavorites.map(f => (
                    <tr key={f._id}>
                      <td className="border px-4 py-2">{f.mealName}</td>
                      <td className="border px-4 py-2">{f.chefName}</td>
                      <td className="border px-4 py-2">৳{f.price ?? "N/A"}</td>
                      <td className="border px-4 py-2">{new Date(f.addedTime).toLocaleDateString()}</td>
                      <td className="border px-4 py-2">
                        <button className="btn btn-sm btn-error" onClick={() => handleDeleteFavorite(f._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
