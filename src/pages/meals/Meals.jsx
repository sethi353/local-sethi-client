// import { useEffect, useState } from "react";
// import useTitle from "../../hooks/useTitle";
// import { Link } from "react-router-dom";

// const Meals = () => {
//   useTitle("Meals");

//   const [meals, setMeals] = useState([]);
//   const [sort, setSort] = useState("asc");
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   useEffect(() => {
//     fetch(
//       `http://localhost:5000/meals?sort=${sort}&page=${page}&limit=${limit}`
//     )
//       .then(res => res.json())
//       .then(data => setMeals(data));
//   }, [sort, page]);

//   return (
//     <div className="max-w-7xl mx-auto mt-10">
//       <div className="flex justify-between mb-6">
//         <h2 className="text-2xl font-bold">Daily Meals</h2>
//         <select
//           className="select select-bordered"
//           onChange={(e) => setSort(e.target.value)}
//         >
//           <option value="asc">Price Low to High</option>
//           <option value="desc">Price High to Low</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {meals.map(meal => (
//           <div key={meal._id} className="card bg-base-100 shadow">
//             <figure>
//               <img src={meal.foodImage} alt={meal.foodName} />
//             </figure>
//             <div className="card-body">
//               <h2 className="card-title">{meal.foodName}</h2>
//               <p>Chef: {meal.chefName}</p>
//               <p>Price: ৳{meal.price}</p>
//               <Link to={`/meals/${meal._id}`} className="btn btn-primary">
//   See Details
// </Link>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center gap-4 mt-10">
//         <button
//           className="btn"
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//         >
//           Prev
//         </button>
//         <button className="btn" onClick={() => setPage(page + 1)}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Meals;




// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function MealsList() {
//   const [meals, setMeals] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/meals")
//       .then(res => setMeals(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl mb-4">Available Meals</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {meals.map(meal => (
//           <div key={meal._id} className="border p-4 rounded">
//             <h2 className="text-xl font-bold">{meal.foodName}</h2>
//             <p>Chef: {meal.chefName}</p>
//             <p>Price: {meal.price} BDT</p>
//             <p>Ingredients: {meal.ingredients.join(", ")}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import axios from "axios";
import MealCard from "./Mealcard";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/meals?sort=${sortOrder}`)
      .then(res => setMeals(res.data));
  }, [sortOrder]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Today's Meals</h1>

      {/* SORT BUTTON */}
      <select
        className="border p-2 mb-4"
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Price: Low → High</option>
        <option value="desc">Price: High → Low</option>
      </select>

      {/* MEAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {meals.map(meal => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </div>
  );
}

