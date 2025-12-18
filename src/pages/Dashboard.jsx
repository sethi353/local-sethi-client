import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/users/${user.email}`)
        .then(res => setRole(res.data.role))
        .catch(err => console.log(err));
    }
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <p>Welcome, {user?.displayName || user?.email}</p>
      <p>Your role: {role}</p>

      <div className="mt-4 flex flex-col gap-2">
        {role === "user" && (
          <>
            <button>Home</button>
            <button>My Orders</button>
            <button onClick={async () => {
        await axios.post("http://localhost:5000/role-request", {
          userName: user.displayName,
          userEmail: user.email,
          requestType: "chef",
        });
        alert("Chef request sent!");
      }}
    >Be a Chef</button>
          </>
        )}
        {role === "chef" && (
          <>
            <button className="btn btn-ghost"> Chef Home</button>
            <button className="btn btn-ghost">My Meals</button>
            <button className="btn btn-ghost">Orders</button>
            {/* ADD MEAL FORM */}
   <button
      className="btn btn-primary mt-2"
      onClick={() => navigate("/dashboard/add-meal")}
    >
      Add Meal
    </button>
          </>
        )}
        {role === "admin" && (
          <>
            <button
      className="btn btn-ghost"
      onClick={() => navigate("/dashboard/admin-users")}
    >
      Manage Users
    </button>
    <button
      className="btn btn-ghost"
      onClick={() => navigate("/dashboard/admin-requests")}
    >
      Approve Chefs
    </button>
          </>
        )}
      </div>
    </div>
  );
}


 