
import { useEffect, useState } from "react";
import axios from "axios";
import MealCard from "./Mealcard";
import { useContext } from "react";
// import { LoadingContext } from "../../context/LoadingContext";


export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  // const { setLoading } = useContext(LoadingContext);
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10; // 10 meals per page
const indexOfLastMeal = currentPage * itemsPerPage;
const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
const displayedMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);



  useEffect(() => {
    axios
      .get(`https://local-sethi-server.vercel.app/meals?sort=${sortOrder}`)
      .then(res => setMeals(res.data));
  }, [sortOrder]);



//   useEffect(() => {
//   const fetchMeals = async () => {
//     setLoading(true); // start global loading
//     try {
//       const res = await axios.get(`http://localhost:5000/meals?sort=${sortOrder}`);
//       setMeals(res.data);
//     } catch (err) {
//       console.error("Failed to fetch meals", err);
//     } finally {
//       setLoading(false); // stop global loading
//     }
//   };

//   fetchMeals();
// }, [sortOrder, setLoading]);




  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4"> Today's All Meals</h1>

      {/* SORT BUTTON */}
      <select
        className="border p-2 mb-4"
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Price: Low → High</option>
        <option value="desc">Price: High → Low</option>
      </select>

      {/* MEAL CARDS
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {meals.map(meal => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div> */}


    {/* MEAL CARDS */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:grid-cols-5 ">
  {displayedMeals.map(meal => (
    <MealCard key={meal._id} meal={meal} />
  ))}
</div>

{/* PAGINATION BUTTONS */}
<div className="flex justify-center mt-4 gap-2">
  {Array.from({ length: Math.ceil(meals.length / itemsPerPage) }).map((_, i) => (
    <button
      key={i}
      className={`px-3 py-1 border ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
      onClick={() => setCurrentPage(i + 1)}
    >
      {i + 1}
    </button>
  ))}
</div>


    </div>
  );
}

