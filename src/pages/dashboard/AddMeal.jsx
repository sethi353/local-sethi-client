// const AddMeal = () => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // later connect to backend
//     alert("Meal added (dummy)");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl">
//       <h2 className="text-xl font-bold mb-4">Add New Meal</h2>

//       <input className="input input-bordered w-full mb-3" placeholder="Food Name" />
//       <input className="input input-bordered w-full mb-3" placeholder="Price" />
//       <input className="input input-bordered w-full mb-3" placeholder="Image URL" />

//       <button className="btn btn-primary">Add Meal</button>
//     </form>
//   );
// };

// export default AddMeal;

// import { useState } from "react";
// import axios from "axios";

// export default function AddMeal({ currentUser }) {
//   const [foodName, setFoodName] = useState("");
//   const [price, setPrice] = useState("");
//   const [ingredients, setIngredients] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const meal = {
//       foodName,
//       price: Number(price),
//       ingredients: ingredients.split(",").map(i => i.trim()),
//       chefName: currentUser.name,
//       chefId: `chef-${currentUser.email}`,
//       userEmail: currentUser.email,
//       createdAt: new Date(),
//     };

//     await axios.post("http://localhost:5000/meals", meal);
//     alert("Meal added successfully!");

//     // Clear form
//     setFoodName("");
//     setPrice("");
//     setIngredients("");
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl mb-4">Add Meal</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-96">
//         <input 
//           type="text" 
//           placeholder="Food Name" 
//           value={foodName} 
//           onChange={(e) => setFoodName(e.target.value)} 
//           required
//         />
//         <input 
//           type="number" 
//           placeholder="Price" 
//           value={price} 
//           onChange={(e) => setPrice(e.target.value)} 
//           required
//         />
//         <input 
//           type="text" 
//           placeholder="Ingredients (comma separated)" 
//           value={ingredients} 
//           onChange={(e) => setIngredients(e.target.value)} 
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Add Meal</button>
//       </form>
//     </div>
//   );
// }















import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddMeal() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User not logged in");
      return;
    }

    const meal = {
      foodName,
      price: Number(price),
      ingredients: ingredients.split(",").map(i => i.trim()),
      chefName: user.displayName || "Unknown Chef",
      chefEmail: user.email,
      createdAt: new Date(),
    };

    await axios.post("http://localhost:5000/meals", meal);

    alert("Meal added successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Meal</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-96">
        <input
          className="input input-bordered"
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          required
        />

        <input
          className="input input-bordered"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          className="input input-bordered"
          type="text"
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />

        <button className="btn btn-primary mt-2" type="submit">
          Add Meal
        </button>
      </form>
    </div>
  );
}
