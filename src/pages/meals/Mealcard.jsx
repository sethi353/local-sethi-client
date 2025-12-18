import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function MealCard({ meal }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDetails = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/meals/${meal._id}`);
    }
  };

  return (
    <div className="border rounded p-4">
      <img src={meal.image} className="h-40 w-full object-cover mb-2" />

      <h2 className="text-xl font-bold">{meal.foodName}</h2>
      <p>Chef: {meal.chefName}</p>
      <p>Chef ID: {meal.chefId}</p>
      <p>Price: ৳{meal.price}</p>
      <p>Rating: ⭐ {meal.rating || 0}</p>
      <p>Area: {meal.deliveryArea}</p>

      <button
        onClick={handleDetails}
        className="btn btn-primary mt-2"
      >
        See Details
      </button>
    </div>
  );
}
