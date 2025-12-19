// src/components/ErrorPage.jsx
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-red-100">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <Link to="/" className="text-blue-600 underline">Go back home</Link>
    </div>
  );
}

