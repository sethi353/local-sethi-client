import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-purple-200 p-6 mt-12">
      <div className="max-w-6xl px-4  mx-auto flex flex-col items-center gap-2 text-center">
        
        {/* Logo / Brand */}
        <div className="text-xl font-bold text-primary">
          🍽 LocalChefBazaar
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-1 w-full max-w-xs">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/meals" className="hover:underline">Meals</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>

        {/* Copyright / Info */}
        <div className="text-sm text-gray-700 mt-2">
          &copy; {new Date().getFullYear()} LocalChefBazaar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
