// import { useContext } from "react";
// import { useForm } from "react-hook-form";
// import { AuthContext } from "../context/AuthContext";
// import Swal from "sweetalert2";

// const Login = () => {
//   const { loginUser } = useContext(AuthContext);
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       await loginUser(data.email, data.password);
//       Swal.fire("Success", "Login successful", "success");
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <form onSubmit={handleSubmit(onSubmit)} className="card p-6 bg-base-100 shadow">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>

//         <input {...register("email")} placeholder="Email" className="input input-bordered w-full mb-3" />
//         <input type="password" {...register("password")} placeholder="Password" className="input input-bordered w-full mb-3" />

//         <button className="btn btn-primary w-full">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate,Link } from "react-router-dom";


export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(form.email, form.password);
      Swal.fire("Success", "Login successful", "success");
      navigate("/dashboard");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input name="email" type="email" placeholder="Email"className="input input-bordered w-full" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" onChange={handleChange} required />
        <button type="submit" className="btn btn-primary w-full">Login</button>
      </form>
      <p className="text-center">
            New here?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Register
            </Link>
          </p>
    </div>
    </div>
    </div>
  );
}

