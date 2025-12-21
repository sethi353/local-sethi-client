


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddMeal from "./pages/dashboard/AddMeal";
import Meals from "./pages/meals/Meals";
import MealDetails from "./pages/meals/MealDetails";
import PrivateRoute from "./routes/PrivateRoute";
import AdminUsers from "./pages/Dashboard/admin/AdminRoleRequests";
import AdminRoleRequests from "./pages/Dashboard/admin/AdminUsers";
import LoadingPage from "./components/LoadingPage";
import ErrorPage from "./components/ErrorPage";
import { useContext } from "react";
import { LoadingContext } from "./context/LoadingContext";





function App() {
  const { loading } = useContext(LoadingContext); 
    if (loading) return <LoadingPage />;
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
{/* catch-all route for unknown pages */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    <Footer />

    </BrowserRouter>
  );

  

}

export default App;

