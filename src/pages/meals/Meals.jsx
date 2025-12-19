
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

