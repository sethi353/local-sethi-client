import { motion } from "framer-motion";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("Home");

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        className="hero min-h-[70vh] bg-base-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="hero-content text-center">
          <div>
            <h1 className="text-5xl font-bold">
              Fresh Homemade Meals Near You
            </h1>
            <p className="mt-4 text-lg">
              Order healthy, affordable meals from local chefs
            </p>
          </div>
        </div>
      </motion.div>

      {/* Extra Section */}
      <div className="my-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="max-w-2xl mx-auto">
          We connect passionate home chefs with customers who love fresh food.
        </p>
      </div>
    </div>
  );
};

export default Home;
