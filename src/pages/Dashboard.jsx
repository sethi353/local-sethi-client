
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";



export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("user");
  const [activeTab, setActiveTab] = useState("profile");
  const [userReviews, setUserReviews] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const navigate = useNavigate();
  const [myMeals, setMyMeals] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
const [chefOrders, setChefOrders] = useState([]);
const [totalUsers, setTotalUsers] = useState(0);
const [ordersPending, setOrdersPending] = useState(0);
const [profile, setProfile] = useState(null);






// Update order status for chef
const handleUpdateOrderStatus = async (orderId, status) => {
  try {
    const res = await axios.patch(`https://local-sethi-server.vercel.app/orders/${orderId}`, {
      orderStatus: status
    });

    if (res.data.modifiedCount || res.data.acknowledged) {
      Swal.fire("Success", `Order ${status}!`, "success");

      // Update locally
      setChefOrders(prev =>
        prev.map(o => (o._id === orderId ? { ...o, orderStatus: status } : o))
      );
    }
  } catch (err) {
    console.log(err);
    Swal.fire("Error", "Failed to update order status", "error");
  }
};




  // Redirect to home if not logged in
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  // Fetch user role
  useEffect(() => {
    if (user) {
      axios
        .get(`https://local-sethi-server.vercel.app/users/${user.email}`)
        .then(res => setRole(res.data.role))
        .catch(err => console.log(err));
    }
  }, [user]);



  // Fetch FULL user document for profile

 useEffect(() => {
  if (user?.email) {
    axios
      .get(`https://local-sethi-server.vercel.app/users/${user.email}`)
      .then(res => {
        setProfile(res.data);
        setRole(res.data.role); // keep role in sync
      })
      .catch(err => console.log(err));
  }
}, [user]);





  // Fetch user reviews and favorites
  useEffect(() => {
    if (user) {
      axios
        .get(`https://local-sethi-server.vercel.app/reviews/user/${user.email}`)
        .then(res => setUserReviews(res.data))
        .catch(err => console.log(err));

      axios
        .get(`https://local-sethi-server.vercel.app/favorites/user/${user.email}`)
        .then(res => setUserFavorites(res.data))
        .catch(err => console.log(err));
    }
  }, [user]);




// Fetch meals when chef clicks “My Meals”

  useEffect(() => {
  if (user && role === "chef" && activeTab === "meals") {
    axios
      .get(`https://local-sethi-server.vercel.app/meals/chef/${user.email}`)
      .then(res => setMyMeals(res.data))
      .catch(err => console.log(err));
  }
}, [user, role, activeTab]);


// Fetch orders in a new useEffect
useEffect(() => {
  if (user && activeTab === "orders") {
    if (role === "user") {
      axios.get(`https://local-sethi-server.vercel.app/orders/${user.email}`)
        .then(res => setUserOrders(res.data))
        .catch(err => console.log(err));
    }
    if (role === "chef") {
     axios.get(`https://local-sethi-server.vercel.app/chef-orders/${user.email}`)
  .then(res => setChefOrders(res.data))

        .catch(err => console.log(err));
    }
  }
}, [user, role, activeTab]);





// Fetch statistics when admin selects “stats” tab
useEffect(() => {
  if (user && role === "admin" && activeTab === "stats") {
    // Fetch total users
    axios.get("https://local-sethi-server.vercel.app/users/count")
      .then(res => setTotalUsers(res.data.totalUsers))
      .catch(err => console.log(err));

    // Fetch pending orders
    axios.get("https://local-sethi-server.vercel.app/orders/pending/count")
      .then(res => setOrdersPending(res.data.pendingOrders))
      .catch(err => console.log(err));
  }
}, [user, role, activeTab]);




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
      const res = await axios.delete(`https://local-sethi-server.vercel.app/reviews/${id}`);
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
      const res = await axios.put(`https://local-sethi-server.vercel.app/reviews/${review._id}`, formValues);
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
      const res = await axios.delete(`https://local-sethi-server.vercel.app/favorites/${id}`);
      if (res.data.success) {
        setUserFavorites(userFavorites.filter(f => f._id !== id));
        Swal.fire("Removed!", "Meal removed from favorites successfully.", "success");
      }
    }
  };





  // Delete meal handler
const handleDeleteMeal = async (id) => {
  const confirm = await Swal.fire({
    title: "Delete meal?",
    text: "This meal will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it"
  });

  if (confirm.isConfirmed) {
    const res = await axios.delete(`https://local-sethi-server.vercel.app/meals/${id}`);
    if (res.data.success) {
      setMyMeals(myMeals.filter(meal => meal._id !== id));
      Swal.fire("Deleted!", "Meal deleted successfully", "success");
    }
  }
};





// Update meal handler
const handleUpdateMeal = async (meal) => {
  const { value: formValues } = await Swal.fire({
    title: "Update Meal",
    html: `
      <input id="name" class="swal2-input" value="${meal.foodName}">
      <input id="price" class="swal2-input" type="number" value="${meal.price}">
      <textarea id="ingredients" class="swal2-textarea">${meal.ingredients}</textarea>
    `,
    preConfirm: () => ({
      foodName: document.getElementById("name").value,
      price: document.getElementById("price").value,
      ingredients: document.getElementById("ingredients").value,
    })
  });

  if (formValues) {
    const res = await axios.put(
      `https://local-sethi-server.vercel.app/meals/${meal._id}`,
      formValues
    );

    if (res.data.success) {
      setMyMeals(myMeals.map(m =>
        m._id === meal._id ? { ...m, ...formValues } : m
      ));
      Swal.fire("Updated!", "Meal updated successfully", "success");
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
            <button className="btn btn-ghost text-left" onClick={() => navigate("/dashboard/admin-users")}>👥 Manage Request</button>
            <button className="btn btn-ghost text-left" onClick={() => navigate("/dashboard/admin-requests")}>✅ Manage User</button>
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
            {/* <p><b>Name:</b> {user?.displayName}</p>
            <p><b>Email:</b> {user?.email}</p> */}
          </div>
        )}

        {/* Orders Tab
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <p>Orders content coming soon...</p>
          </div>
        )} */}





      {activeTab === "profile" && profile && (
  <div className="flex justify-center">
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">

      <div className="flex items-center gap-4 mb-4">
        <img
          src={profile.image || "https://i.ibb.co/2kR5kzp/user.png"}
          alt="User"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p><b>Role:</b> {profile.role}</p>
        <p><b>Status:</b> {profile.status || "active"}</p>
        <p><b>Address:</b> {profile.address || "Not provided"}</p>

        {profile.role === "chef" && (
          <p><b>Chef ID:</b> {profile.chefId}</p>
        )}
      </div>
    </div>
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
        {/* {activeTab === "favorites" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Favourites</h2>
            {userFavorites.length === 0 ? (
              <p>No favorites yet.</p>
            ) : (
              <div className="overflow-x-auto">
              <table className="min-w-[700px] w-full border-collapse border border-gray-300">
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
              </div>
            )}
          </div>
        )}

       */}


      {activeTab === "favorites" && (
  <div>
    <h2 className="text-2xl font-bold mb-4">My Favourites</h2>

    {userFavorites.length === 0 ? (
      <p>No favorites yet.</p>
    ) : (
      <>
        {/* TABLE for medium and large screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-[700px] w-full border-collapse border border-gray-300">
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
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteFavorite(f._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CARD layout for small screens */}
        <div className="grid gap-4 md:hidden">
          {userFavorites.map(f => (
            <div key={f._id} className="bg-white shadow rounded p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg">{f.mealName}</h3>
                <p className="text-gray-600">Chef: {f.chefName}</p>
                <p className="text-gray-600">Price: ৳{f.price ?? "N/A"}</p>
                <p className="text-gray-500 text-sm">Added: {new Date(f.addedTime).toLocaleDateString()}</p>
              </div>
              <button
                className="btn btn-sm btn-error mt-2 w-full"
                onClick={() => handleDeleteFavorite(f._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
)}










      {/* Render “My Meals” tab */}
      {activeTab === "meals" && (
  <div>
    <h2 className="text-2xl font-bold mb-4">My Meals</h2>

    {myMeals.length === 0 ? (
      <p>No meals added yet.</p>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myMeals.map(meal => (
          <div key={meal._id} className="card bg-white shadow-md">
            <img src={meal.photoUrl} className="h-40 w-full object-cover" />

            <div className="p-4">
              <h3 className="font-bold">{meal.foodName}</h3>
              <p>💰 Price: ৳{meal.price}</p>
              <p>⭐ Rating: {meal.rating || "N/A"}</p>
              <p>🧂 Ingredients: {meal.ingredients}</p>
              <p>⏱ Time: {meal.deliveryTime}</p>
              <p>👨‍🍳 Chef: {meal.chefName}</p>

              <div className="flex gap-2 mt-3">
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDeleteMeal(meal._id)}
                >
                  Delete
                </button>

                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleUpdateMeal(meal)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}




{/* “Orders” tab content */}
{activeTab === "orders" && role === "user" && (
  <div>
    <h2 className="text-2xl font-bold mb-4">My Orders</h2>
    {userOrders.length === 0 ? (
      <p>No orders yet.</p>
    ) : (
      <div className="grid md:grid-cols-2 gap-4">
        {userOrders.map(order => (
          <div key={order._id} className="border p-4 rounded bg-white shadow">
            <p><b>Meal:</b> {order.mealName}</p>
            <p><b>Price:</b> ৳{order.price}</p>
            <p><b>Quantity:</b> {order.quantity}</p>
            <p><b>Order Status:</b> {order.orderStatus}</p>
            <p><b>Payment Status:</b> {order.paymentStatus}</p>
            <p><b>Delivery Address:</b> {order.userAddress}</p>
          </div>
        ))}
      </div>
    )}
  </div>
)}

{activeTab === "orders" && role === "chef" && (
  <div>
    <h2 className="text-2xl font-bold mb-4">Order Requests</h2>
    {chefOrders.length === 0 ? (
      <p>No orders yet.</p>
    ) : (
      <div className="grid md:grid-cols-2 gap-4">
        {chefOrders.map(order => (
          <div key={order._id} className="border p-4 rounded bg-white shadow">
            <p><b>Meal:</b> {order.mealName}</p>
            <p><b>Price:</b> ৳{order.price}</p>
            <p><b>Quantity:</b> {order.quantity}</p>
            <p><b>User:</b> {order.userEmail}</p>
            <p><b>Order Status:</b> {order.orderStatus}</p>
            <p><b>Payment Status:</b> {order.paymentStatus}</p>
            <p><b>Delivery Address:</b> {order.userAddress}</p>

            <div className="flex gap-2 mt-2">
              <button
                className="btn btn-sm btn-error"
                onClick={() => handleUpdateOrderStatus(order._id, "cancelled")}
                disabled={order.orderStatus !== "pending"}
              >Cancel</button>

              <button
                className="btn btn-sm btn-success"
                onClick={() => handleUpdateOrderStatus(order._id, "accepted")}
                disabled={order.orderStatus !== "pending"}
              >Accept</button>

              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleUpdateOrderStatus(order._id, "delivered")}
                disabled={order.orderStatus !== "accepted"}
              >Deliver</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}




{activeTab === "stats" && role === "admin" && (
  <div>
    <h2 className="text-2xl font-bold mb-4">Platform Statistics</h2>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div className="p-4 bg-blue-100 rounded shadow">
        <h3 className="text-xl font-semibold">Total Users</h3>
        <p className="text-2xl font-bold">{totalUsers}</p>
      </div>
      <div className="p-4 bg-yellow-100 rounded shadow">
        <h3 className="text-xl font-semibold">Orders Pending</h3>
        <p className="text-2xl font-bold">{ordersPending}</p>
      </div>
    </div>

    {/* Bar Chart */}
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={[
          { name: "Total Users", value: totalUsers },
          { name: "Orders Pending", value: ordersPending }
        ]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
)}






      </main>
    </div>
  );
}
