


import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import MealCard from "../meals/Mealcard"; 

const Home = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null); // store user role
  const [dailyMeals, setDailyMeals] = useState([]);
const [reviews, setReviews] = useState([]);

  




  // Fetch role from backend
  useEffect(() => {
    if (user) {
      axios
        .get(`https://local-sethi-server.vercel.app/users/${user.email}`)
        .then((res) => setRole(res.data.role))
        .catch((err) => console.log(err));
    }
  }, [user]);



// Fetch meals and reviews from backend
useEffect(() => {
  // Fetch 6 meals for Home page
  axios
    .get("https://local-sethi-server.vercel.app/meals?limit=6&sort=asc")
    .then(res => setDailyMeals(res.data))
    .catch(err => console.log(err));

  // Fetch all reviews for Home page
  axios
    .get("https://local-sethi-server.vercel.app/reviews")
    .then(res => setReviews(res.data))
    .catch(err => console.log(err));
}, []);

 





  const handleRoleRequest = async (type) => {
    if (!user) return alert("You need to log in first!");
    await axios.post("https://local-sethi-server.vercel.app/role-request", {
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
        className="hero min-h-[70vh] relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        
      >

    <div
  className="absolute inset-0 bg-center bg-cover"
  style={{
    backgroundImage: `url("https://i.ibb.co.com/RTmn7jLG/download-61.jpg")`,
    filter: "brightness(50%)",
  }}
/>


      {/* Dark overlay */}
  <div className="absolute inset-0   "></div>


        <div className="hero-content relative z-10 text-center flex flex-col items-center gap-6 text-white">
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




{/* Daily Meals Section */}
<div className="my-20">
  <h2 className="text-3xl font-bold text-center mb-8">Today's Meals</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {dailyMeals.map(meal => (
      <MealCard key={meal._id} meal={meal} />
    ))}
  </div>
</div>









<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
  {reviews.map(review => (
    <div key={review._id} className="p-6 bg-white rounded-lg shadow-md">
      {/* User info + date */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          {review.userImage && (
            <img
              src={review.userImage}
              alt={review.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <span className="font-semibold">{review.userName}</span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(review.date).toLocaleDateString()}
        </span>
      </div>

      {/* Comment */}
      <p className="text-gray-700 mb-2">"{review.comment}"</p>

      {/* Rating */}
      <div className="text-yellow-500">
        {"★".repeat(review.rating || 0)}
        {"☆".repeat(5 - (review.rating || 0))}
      </div>
    </div>
  ))}
</div>

      

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
