// import { useParams } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import Swal from "sweetalert2";
// import useTitle from "../../hooks/useTitle";
// import { Link } from "react-router-dom";

// const MealDetails = () => {
//   useTitle("Meal Details");
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);

//   const [meal, setMeal] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/meals/${id}`)
//       .then(res => res.json())
//       .then(data => setMeal(data));

//     fetch(`http://localhost:5000/reviews/${id}`)
//       .then(res => res.json())
//       .then(data => setReviews(data));
//   }, [id]);

//   const handleFavorite = async () => {
//     const res = await fetch("http://localhost:5000/favorites", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         authorization: `Bearer ${localStorage.getItem("access-token")}`,
//       },
//       body: JSON.stringify({
//         userEmail: user.email,
//         mealId: meal._id,
//         mealName: meal.foodName,
//         chefId: meal.chefId,
//         chefName: meal.chefName,
//         price: meal.price,
//       }),
//     });

//     const data = await res.json();
//     Swal.fire("Success", data.message || "Added to favorites", "success");
//   };

//   if (!meal) return <p className="text-center mt-20">Loading...</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <img src={meal.foodImage} className="rounded-lg mb-6" />

//       <h2 className="text-3xl font-bold">{meal.foodName}</h2>
//       <p>Chef: {meal.chefName}</p>
//       <p>Price: ৳{meal.price}</p>
//       <p>Delivery Area: {meal.deliveryArea}</p>

//       <button onClick={handleFavorite} className="btn btn-outline mt-4">
//         ❤️ Add to Favorite
//       </button>

//       {/* Reviews */}
//       <div className="mt-10">
//         <h3 className="text-xl font-bold mb-4">Reviews</h3>

//         {reviews.map(r => (
//           <div key={r._id} className="border p-3 rounded mb-3">
//             <p className="font-bold">{r.reviewerName}</p>
//             <p>{r.comment}</p>
//             <Link to={`/order/${meal._id}`} className="btn btn-success mt-4 ml-4">
//   🛒 Order Now
// </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MealDetails;





// import { useParams } from "react-router-dom";
// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../context/AuthContext";

// export default function MealDetails() {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);

//   const [meal, setMeal] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   // Fetch meal + reviews
//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/meals/${id}`)
//       .then(res => setMeal(res.data));

//     axios
//       .get(`http://localhost:5000/reviews/${id}`)
//       .then(res => setReviews(res.data));
//   }, [id]);

//   // Add to favorite
//   const handleFavorite = async () => {
//     const favoriteData = {
//       userEmail: user.email,
//       mealId: meal._id,
//       mealName: meal.foodName,
//       chefId: meal.chefId,
//       chefName: meal.chefName,
//       price: meal.price
//     };

//     const res = await axios.post(
//       "http://localhost:5000/favorites",
//       favoriteData
//     );

//     if (res.data.exists) {
//       Swal.fire("Info", "Already in favorites", "info");
//     } else {
//       Swal.fire("Success", "Added to favorites!", "success");
//     }
//   };

//   // Submit review
//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();

//     const review = {
//       foodId: id,
//       reviewerName: user.displayName,
//       reviewerImage: user.photoURL,
//       rating: e.target.rating.value,
//       comment: e.target.comment.value
//     };

//     const res = await axios.post(
//       "http://localhost:5000/reviews",
//       review
//     );

//     if (res.data.success) {
//       Swal.fire("Success", "Review submitted successfully!", "success");
//       setReviews(prev => [review, ...prev]); // instant UI update
//       e.target.reset();
//     }
//   };

//   if (!meal) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       {/* Meal Info */}
//       <img
//         src={meal.image}
//         alt={meal.foodName}
//         className="w-full h-64 object-cover rounded mb-4"
//       />

//       <h1 className="text-3xl font-bold">{meal.foodName}</h1>

//       <p className="mt-2"><b>Chef:</b> {meal.chefName}</p>
//       <p><b>Chef ID:</b> {meal.chefId}</p>
//       <p><b>Price:</b> ৳{meal.price}</p>
//       <p><b>Rating:</b> ⭐ {meal.rating || 0}</p>
//       <p><b>Delivery Area:</b> {meal.deliveryArea}</p>
//       <p><b>Delivery Time:</b> {meal.deliveryTime} mins</p>
//       <p><b>Chef Experience:</b> {meal.chefExperience} years</p>

//       <p className="mt-3">
//         <b>Ingredients:</b> {meal.ingredients?.join(", ")}
//       </p>

//       {/* Buttons */}
//       <div className="flex gap-4 mt-4">
//         <button className="btn btn-success">
//           Order Now
//         </button>

//         {user && (
//           <button
//             onClick={handleFavorite}
//             className="btn btn-outline"
//           >
//             ❤️ Add to Favorite
//           </button>
//         )}
//       </div>

//       {/* Reviews Section */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-bold mb-4">Reviews</h2>

//         {reviews.length === 0 && (
//           <p className="text-gray-500">No reviews yet.</p>
//         )}

//         {reviews.map((r, index) => (
//           <div key={index} className="border p-4 rounded mb-3">
//             <div className="flex items-center gap-3">
//               <img
//                 src={r.reviewerImage}
//                 alt={r.reviewerName}
//                 className="w-10 h-10 rounded-full"
//               />
//               <div>
//                 <p className="font-bold">{r.reviewerName}</p>
//                 <p>⭐ {r.rating}</p>
//               </div>
//             </div>

//             <p className="mt-2">{r.comment}</p>
//           </div>
//         ))}

//         {/* Review Form */}
//         {user && (
//           <form onSubmit={handleReviewSubmit} className="mt-6">
//             <input
//               name="rating"
//               type="number"
//               min="1"
//               max="5"
//               placeholder="Rating (1–5)"
//               className="input input-bordered w-full mb-2"
//               required
//             />

//             <textarea
//               name="comment"
//               placeholder="Write your review"
//               className="textarea textarea-bordered w-full mb-2"
//               required
//             />

//             <button className="btn btn-primary">
//               Give Review
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useParams } from "react-router-dom";
// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../context/AuthContext";

// export default function MealDetails() {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);

//   const [meal, setMeal] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     // ⛔ stop if id is not ready
//     if (!id) return;

//     // Fetch meal
//     axios
//       .get(`http://localhost:5000/meals/${id}`)
//       .then(res => setMeal(res.data))
//       .catch(err => console.error("Meal fetch error:", err));

//     // Fetch reviews
//     axios
//       .get(`http://localhost:5000/reviews/${id}`)
//       .then(res => setReviews(res.data))
//       .catch(err => console.error("Review fetch error:", err));

//   }, [id]);

//   // Add to favorites
//   const handleFavorite = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/favorites", {
//         userEmail: user.email,
//         mealId: meal._id,
//         mealName: meal.foodName,
//         chefId: meal.chefId,
//         chefName: meal.chefName,
//         price: meal.price,
//       });

//       if (res.data.exists) {
//         Swal.fire("Info", "Already in favorites", "info");
//       } else {
//         Swal.fire("Success", "Added to favorites!", "success");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Submit review
//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();

//     const review = {
//       foodId: id,
//       reviewerName: user.displayName,
//       reviewerImage: user.photoURL,
//       rating: e.target.rating.value,
//       comment: e.target.comment.value,
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/reviews",
//         review
//       );

//       if (res.data.success) {
//         Swal.fire("Success", "Review submitted successfully!", "success");
//         setReviews(prev => [review, ...prev]);
//         e.target.reset();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!meal) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       {/* Meal Info */}
//       <img
//         src={meal.image}
//         alt={meal.foodName}
//         className="w-full h-64 object-cover rounded mb-4"
//       />

//       <h1 className="text-3xl font-bold">{meal.foodName}</h1>

//       <p className="mt-2"><b>Chef:</b> {meal.chefName}</p>
//       <p><b>Chef ID:</b> {meal.chefId}</p>
//       <p><b>Price:</b> ৳{meal.price}</p>
//       <p><b>Delivery Area:</b> {meal.deliveryArea}</p>
//       <p><b>Delivery Time:</b> {meal.deliveryTime} mins</p>
//       <p><b>Chef Experience:</b> {meal.chefExperience} years</p>

//       <p className="mt-3">
//         <b>Ingredients:</b> {meal.ingredients?.join(", ")}
//       </p>

//       {/* Buttons */}
//       <div className="flex gap-4 mt-4">
//         <button className="btn btn-success">Order Now</button>

//         {user && (
//           <button onClick={handleFavorite} className="btn btn-outline">
//             ❤️ Add to Favorite
//           </button>
//         )}
//       </div>

//       {/* Reviews */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-bold mb-4">Reviews</h2>

//         {reviews.length === 0 && (
//           <p className="text-gray-500">No reviews yet.</p>
//         )}

//         {reviews.map((r, index) => (
//           <div key={index} className="border p-4 rounded mb-3">
//             <div className="flex items-center gap-3">
//               <img
//                 src={r.reviewerImage}
//                 className="w-10 h-10 rounded-full"
//                 alt=""
//               />
//               <div>
//                 <p className="font-bold">{r.reviewerName}</p>
//                 <p>⭐ {r.rating}</p>
//               </div>
//             </div>
//             <p className="mt-2">{r.comment}</p>
//           </div>
//         ))}

//         {user && (
//           <form onSubmit={handleReviewSubmit} className="mt-6">
//             <input
//               type="number"
//               name="rating"
//               min="1"
//               max="5"
//               placeholder="Rating (1-5)"
//               className="input input-bordered w-full mb-2"
//               required
//             />

//             <textarea
//               name="comment"
//               placeholder="Write your review"
//               className="textarea textarea-bordered w-full mb-2"
//               required
//             />

//             <button className="btn btn-primary">
//               Give Review
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }


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

  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:5000/meals/${id}`)
      .then(res => setMeal(res.data));

    axios.get(`http://localhost:5000/reviews/${id}`)
      .then(res => setReviews(res.data));
  }, [id]);

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
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
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
        <button className="btn btn-success">Order Now</button>

        {user && (
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

        {user && (
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
