// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import Swal from "sweetalert2";

// const Register = () => {
//   const { createUser } = useContext(AuthContext);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [image, setImage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const user = await createUser(name, email, password, image);
//       Swal.fire("Success", "User registered successfully!", "success");
//       console.log("Registered user:", user);
//     } catch (err) {
//       Swal.fire("Error", err.message || "Registration failed", "error");
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded">
//       <h2 className="text-2xl mb-4">Register</h2>

//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full mb-2 p-2 border rounded"
//         required
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-full mb-2 p-2 border rounded"
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full mb-2 p-2 border rounded"
//         required
//       />
//       <input
//         type="text"
//         placeholder="Image URL (optional)"
//         value={image}
//         onChange={(e) => setImage(e.target.value)}
//         className="w-full mb-4 p-2 border rounded"
//       />
//       <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
//         Register
//       </button>
//     </form>
//   );
// };

// export default Register;



import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate,Link } from "react-router-dom";
 "react-router-dom";

export default function Register() {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", image: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(form.name, form.email, form.password, form.image);
      Swal.fire("Success", "Registration complete", "success");
      navigate("/dashboard");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
     <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Register</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input name="name" placeholder="Name" className="input input-bordered w-full" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" onChange={handleChange} required />
        <input name="image" placeholder="Photo URL" className="input input-bordered w-full" onChange={handleChange} required/>
        <input name="address" placeholder="Address" className="input input-bordered w-full" onChange={handleChange} required/>
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Confirm Password" className="input input-bordered w-full" onChange={handleChange} required />
        
        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>
      <p className="text-center">
            Already have an account? <Link to="/login" className="text-primary font-semibold">Login</Link>
          </p>
    </div>
    </div>
    </div>
  );
}

