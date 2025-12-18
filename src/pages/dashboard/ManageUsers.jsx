// import { useEffect, useState } from "react";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/users", {
//       headers: {
//         authorization: `Bearer ${localStorage.getItem("access-token")}`,
//       },
//     })
//       .then(res => res.json())
//       .then(data => setUsers(data));
//   }, []);

//   const makeRole = (id, role) => {
//     fetch(`http://localhost:5000/users/${id}`, {
//       method: "PATCH",
//       headers: {
//         "content-type": "application/json",
//         authorization: `Bearer ${localStorage.getItem("access-token")}`,
//       },
//       body: JSON.stringify({ role }),
//     });
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

//       {users.map(user => (
//         <div key={user._id} className="flex justify-between mb-2 border p-2">
//           <p>{user.email}</p>
//           <div className="space-x-2">
//             <button onClick={() => makeRole(user._id, "chef")} className="btn btn-sm">
//               Make Chef
//             </button>
//             <button onClick={() => makeRole(user._id, "admin")} className="btn btn-sm">
//               Make Admin
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ManageUsers;
