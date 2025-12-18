// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";
// import Home from "./pages/home/Home";
// import Meals from "./pages/meals/Meals";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import PrivateRoute from "./routes/PrivateRoute";
// import Order from "./pages/orders/Order";
// import { orderLoader } from "./routes/orderLoader";
// import DashboardLayout from "./layouts/DashboardLayout";
// import UserOrders from "./pages/dashboard/UserOrders";
// import AddMeal from "./pages/dashboard/AddMeal";
// import ManageUsers from "./pages/dashboard/ManageUsers";


// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/meals" element={<Meals />} />
//         </Route>

//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//          <Route
//   path="/dashboard"
//   element={
//     <PrivateRoute>
//       <DashboardLayout />
//     </PrivateRoute>
//   }
// >
//   <Route index element={<h2>Dashboard Home</h2>} />
//   <Route path="orders" element={<UserOrders />} />
//   <Route path="add-meal" element={<AddMeal />} />
//   <Route path="manage-users" element={<ManageUsers />} />
// </Route>

//         <Route
//   path="/order/:id"
//   element={
//     <PrivateRoute>
//       <Order />
//     </PrivateRoute>
//   }
//   loader={orderLoader}
// />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import AddMeal from "./pages/dashboard/AddMeal";
import Meals from "./pages/meals/Meals";
import MealDetails from "./pages/meals/MealDetails";
import PrivateRoute from "./routes/PrivateRoute";
import AdminUsers from "./pages/Dashboard/admin/AdminRoleRequests";
import AdminRoleRequests from "./pages/Dashboard/admin/AdminUsers";



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/add-meal" element={<AddMeal />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/dashboard/admin-users" element={<AdminUsers />} />
<Route path="/dashboard/admin-requests" element={<AdminRoleRequests />} />

        <Route
  path="/meals/:id"
  element={
    <PrivateRoute>
      <MealDetails />
    </PrivateRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );

  

}

export default App;

