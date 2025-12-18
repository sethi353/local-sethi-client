// // import { motion } from "framer-motion";
// // import useTitle from "../../hooks/useTitle";

// // const Home = () => {
// //   useTitle("Home");

// //   return (
// //     <div>
// //       {/* Hero Section */}
// //       <motion.div
// //         className="hero min-h-[70vh] bg-base-200"
// //         initial={{ opacity: 0, y: 40 }}
// //         animate={{ opacity: 1, y: 0 }}
// //       >
// //         <div className="hero-content text-center">
// //           <div>
// //             <h1 className="text-5xl font-bold">
// //               Fresh Homemade Meals Near You
// //             </h1>
// //             <p className="mt-4 text-lg">
// //               Order healthy, affordable meals from local chefs
// //             </p>
// //           </div>
// //         </div>
// //       </motion.div>

// //       {/* Extra Section */}
// //       <div className="my-20 text-center">
// //         <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
// //         <p className="max-w-2xl mx-auto">
// //           We connect passionate home chefs with customers who love fresh food.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;


// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { motion } from "framer-motion";

// const Home = () => {
//   const { user } = useContext(AuthContext);
//   const [role, setRole] = useState(null);

//   const handleRoleRequest = async (type) => {
//     if (!user) return alert("You need to log in first!");
//     await axios.post("http://localhost:5000/role-request", {
//       userName: user.displayName,
//       userEmail: user.email,
//       requestType: type,
//     });
//     alert(`${type === "chef" ? "Chef" : "Admin"} request sent!`);
//   };

//   return (
//     <div>
//       {/* Hero Section */}
//       <motion.div
//         className="hero min-h-[70vh] bg-base-200"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <div className="hero-content text-center flex flex-col items-center gap-6">
//           <div>
//             <h1 className="text-5xl font-bold">
//               Fresh Homemade Meals Near You
//             </h1>
//             <p className="mt-4 text-lg">
//               Order healthy, affordable meals from local chefs
//             </p>
//           </div>

//           {/* Conditional Role Buttons */}
//           {user && (
//             <div className="flex gap-4 mt-4">
//               {user.role !== "chef" && user.role !== "admin" && (
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => handleRoleRequest("chef")}
//                 >
//                   👨‍🍳 Be a Chef
//                 </button>
//               )}
//               {user.role !== "admin" && (
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => handleRoleRequest("admin")}
//                 >
//                   🛡 Be an Admin
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </motion.div>

//       {/* Extra Section */}
//       <div className="my-20 text-center">
//         <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
//         <p className="max-w-2xl mx-auto">
//           We connect passionate home chefs with customers who love fresh food.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null); // store user role

  // Fetch role from backend
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/users/${user.email}`)
        .then((res) => setRole(res.data.role))
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleRoleRequest = async (type) => {
    if (!user) return alert("You need to log in first!");
    await axios.post("http://localhost:5000/role-request", {
      userName: user.displayName,
      userEmail: user.email,
      requestType: type,
    });
    alert(`${type === "chef" ? "Chef" : "Admin"} request sent!`);
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        className="hero min-h-[70vh] bg-base-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="hero-content text-center flex flex-col items-center gap-6">
          <div>
            <h1 className="text-5xl font-bold">
              Fresh Homemade Meals Near You
            </h1>
            <p className="mt-4 text-lg">
              Order healthy, affordable meals from local chefs
            </p>
          </div>

          {/* Conditional Role Buttons */}
          {user && role && (
            <div className="flex gap-4 mt-4">
              {role === "user" && (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleRoleRequest("chef")}
                  >
                    👨‍🍳 Be a Chef
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleRoleRequest("admin")}
                  >
                    🛡 Be an Admin
                  </button>
                </>
              )}
              {role === "chef" && (
                <button
                  className="btn btn-secondary"
                  onClick={() => handleRoleRequest("admin")}
                >
                  🛡 Be an Admin
                </button>
              )}
              {role === "admin" && null /* No buttons */}
            </div>
          )}
        </div>
      </motion.div>

      {/* Extra Section */}
      <div className="my-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="max-w-2xl mx-auto">
          We connect passionate home chefs with customers who love fresh food.
        </p>
      </div>
    </div>
  );
};

export default Home;
