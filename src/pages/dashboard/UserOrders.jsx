// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import useTitle from "../../hooks/useTitle";

// const UserOrders = () => {
//   useTitle("My Orders");
//   const { user } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/orders/user/${user.email}`, {
//       headers: {
//         authorization: `Bearer ${localStorage.getItem("access-token")}`,
//       },
//     })
//       .then(res => res.json())
//       .then(data => setOrders(data));
//   }, [user.email]);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">My Orders</h2>

//       {orders.map(order => (
//         <div key={order._id} className="border p-4 mb-3 rounded">
//           <p><b>Meal:</b> {order.mealName}</p>
//           <p><b>Price:</b> ৳{order.price}</p>
//           <p><b>Status:</b> {order.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserOrders;
