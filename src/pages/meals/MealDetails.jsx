import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

export default function MealDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [role, setRole] = useState(null);


  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:5000/meals/${id}`)
      .then(res => setMeal(res.data));

    axios.get(`http://localhost:5000/reviews/${id}`)
      .then(res => setReviews(res.data));


   // ✅ FETCH ROLE
  if (user?.email) {
    axios
      .get(`http://localhost:5000/users/${user.email}`)
      .then(res => setRole(res.data.role));
  }



  }, [id]);

 




  



const handleOrderNow = async () => {
  try {
    const order = {
      userEmail: user.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefEmail: meal.chefEmail,
      chefName: meal.chefName,
      price: meal.price,
      quantity: 1, // You can make it dynamic later
      userAddress: "User Address Here", // Replace with real address input if you have
      orderStatus: "pending",
      paymentStatus: "pending"
    };

    const res = await axios.post("http://localhost:5000/orders", order);

    if (res.data.insertedId || res.data.acknowledged) {
      Swal.fire("Success", "Order placed successfully!", "success");
    }
  } catch (err) {
    console.log(err);
    Swal.fire("Error", "Failed to place order", "error");
  }
};


  

  const handleFavorite = async () => {
    const res = await axios.post("http://localhost:5000/favorites", {
      userEmail: user.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefName: meal.chefName,
      chefEmail: meal.chefEmail,
      price: meal.price,
    });

    if (res.data.exists) {
      Swal.fire("Info", "Already in favorites", "info");
    } else {
      Swal.fire("Success", "Added to favorites!", "success");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const review = {
      foodId: id,
       mealName: meal.foodName,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
       reviewerEmail: user.email, 
      rating: e.target.rating.value,
      comment: e.target.comment.value,
    };

    const res = await axios.post("http://localhost:5000/reviews", review);

    if (res.data.success) {
      Swal.fire("Success", "Review submitted!", "success");
      setReviews(prev => [review, ...prev]);
      e.target.reset();
    }
  };

  if (!meal) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={meal.photoUrl}
        alt={meal.foodName}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <h1 className="text-3xl font-bold">{meal.foodName}</h1>

      <p><b>Chef:</b> {meal.chefName}</p>
      <p><b>Chef Email:</b> {meal.chefEmail}</p>
      <p><b>Price:</b> ৳{meal.price}</p>
      <p><b>Area:</b> {meal.area}</p>
      <p><b>Rating:</b> ⭐ {meal.rating ?? 0}</p>

      <p className="mt-3">
        <b>Ingredients:</b> {meal.ingredients?.join(", ")}
      </p>

      <div className="flex gap-4 mt-4">
        <button className="btn btn-success"  onClick={handleOrderNow}>Order Now</button>

        {role === "user" &&  (
          <button onClick={handleFavorite} className="btn btn-outline">
            ❤️ Add to Favorite
          </button>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {reviews.map((r, index) => (
          <div key={index} className="border p-4 rounded mb-3">
            <div className="flex items-center gap-3">
              <img
                src={r.reviewerImage}
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <div>
                <p className="font-bold">{r.reviewerName}</p>
                <p>⭐ {r.rating}</p>
              </div>
            </div>
            <p className="mt-2">{r.comment}</p>
          </div>
        ))}

        {role === "user" &&  (
          <form onSubmit={handleReviewSubmit} className="mt-6">
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              placeholder="Rating (1-5)"
              className="input input-bordered w-full mb-2"
              required
            />

            <textarea
              name="comment"
              placeholder="Write your review"
              className="textarea textarea-bordered w-full mb-2"
              required
            />

            <button className="btn btn-primary">Give Review</button>
          </form>
        )}
      </div>
    </div>
  );
} 
