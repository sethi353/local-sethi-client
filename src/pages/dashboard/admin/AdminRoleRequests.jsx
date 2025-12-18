import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRoleRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/role-request") // backend endpoint for requests
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = (id) => {
    axios
      .patch(`http://localhost:5000/role-request/${id}`, { requestStatus: "approved" })
      .then(() => {
        alert("Request approved!");
        setRequests((prev) => prev.filter((r) => r._id !== id));
      });
  };

  const handleReject = (id) => {
    axios
      .patch(`http://localhost:5000/role-request/${id}`, { requestStatus: "rejected" })
      .then(() => {
        alert("Request rejected!");
        setRequests((prev) => prev.filter((r) => r._id !== id));
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Role Requests</h1>
      {requests.length === 0 && <p>No pending requests</p>}
      {requests.map((r) => (
        <div key={r._id} className="border p-2 mb-2 flex justify-between items-center">
          <div>
            <p>
              <strong>{r.userName}</strong> requests <strong>{r.requestType}</strong>
            </p>
            <p>Email: {r.userEmail}</p>
            <p>Status: {r.requestStatus}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => handleApprove(r._id)}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleReject(r._id)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
