// import { useContext } from "react";
// import { useLoaderData } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import Swal from "sweetalert2";
// import useTitle from "../../hooks/useTitle";

// const Order = () => {
//   useTitle("Place Order");
//   const meal = useLoaderData();
//   const { user } = useContext(AuthContext);

//   const totalPrice = meal.price;

//   const handleOrder = async (e) => {
//     e.preventDefault();

//     const order = {
//       mealId: meal._id,
//       mealName: meal.foodName,
//       price: meal.price,
//       userName: user.displayName,
//       userEmail: user.email,
//       chefName: meal.chefName,
//       status: "pending",
//     };

//     const res = await fetch("http://localhost:5000/orders", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         authorization: `Bearer ${localStorage.getItem("access-token")}`,
//       },
//       body: JSON.stringify(order),
//     });

//     if (res.ok) {
//       Swal.fire("Success!", "Order placed successfully", "success");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-6">Confirm Your Order</h2>

//       <form onSubmit={handleOrder} className="space-y-4">
//         <input
//           className="input input-bordered w-full"
//           value={user.displayName}
//           disabled
//         />

//         <input
//           className="input input-bordered w-full"
//           value={user.email}
//           disabled
//         />

//         <input
//           className="input input-bordered w-full"
//           value={meal.foodName}
//           disabled
//         />

//         <input
//           className="input input-bordered w-full"
//           value={`৳${totalPrice}`}
//           disabled
//         />

//         <button className="btn btn-primary w-full">
//           Place Order
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Order;
