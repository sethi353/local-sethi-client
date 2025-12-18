import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users", {
        // In this version we are not using JWT, so no headers needed
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All Users</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Role</th>
            <th className="border px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border px-2 py-1">{u.name}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.role}</td>
              <td className="border px-2 py-1">
                {/* Example: change role to chef/admin */}
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => {
                    axios
                      .patch(`http://localhost:5000/users/${u._id}`, { role: "chef" })
                      .then(() => {
                        alert("Role updated to chef");
                        setUsers((prev) =>
                          prev.map((user) =>
                            user._id === u._id ? { ...user, role: "chef" } : user
                          )
                        );
                      });
                  }}
                >
                  Make Chef
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    axios
                      .patch(`http://localhost:5000/users/${u._id}`, { role: "admin" })
                      .then(() => {
                        alert("Role updated to admin");
                        setUsers((prev) =>
                          prev.map((user) =>
                            user._id === u._id ? { ...user, role: "admin" } : user
                          )
                        );
                      });
                  }}
                >
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
