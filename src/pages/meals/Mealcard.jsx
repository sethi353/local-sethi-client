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
    <div className="bg-white  rounded-lg shadow-md overflow-hidden w-full flex flex-col">
      <img src={meal.photoUrl} className="h-40 w-full object-cover mb-2" />

      <h2 className="text-xl font-bold">{meal.foodName}</h2>
      <p>Chef: {meal.chefName}</p>
      <p>Chef ID: {meal.chefEmail}</p>
      <p>Price: ৳{meal.price}</p>
      <p>Rating: ⭐ {meal.rating ?? 0}</p>
      <p>Area: {meal.area}</p>

      <button
        onClick={handleDetails}
        className="btn btn-primary mt-2"
      >
        See Details
      </button>
    </div>
  );
}
