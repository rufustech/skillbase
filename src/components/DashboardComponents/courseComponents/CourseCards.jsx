import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CourseCard from "./CourseCard";
import { urls } from "../../constants";

function CourseCards() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Define gradient colors for cards
  const gradients = [
    "from-blue-500 to-blue-600",
    "from-green-500 to-green-600",
    "from-purple-500 to-purple-600",
    "from-orange-500 to-orange-600",
    "from-pink-500 to-pink-600",
    "from-teal-500 to-teal-600",
    "from-red-500 to-red-600",
    "from-indigo-500 to-indigo-600",
    "from-yellow-500 to-yellow-600",
    "from-cyan-500 to-cyan-600",
  ];

  async function fetchCourses() {
    try {
      setIsLoading(true);
      const url = `${urls.url}/api/courses`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch courses (${response.status})`);
      }

      const result = await response.json();
      console.log("API response data:", result);

      if (result.success && Array.isArray(result.data)) {
        setCourses(result.data);
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Unable to load courses. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="px- sm:ml-64 mx-auto min-h-[400px] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#432010] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-4 px-4 place-items-center"
      >
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchCourses}
          className="px-6 py-2 bg-[#432010] text-white rounded-full hover:bg-[#543121] transition-colors"
        >
          Try Again
        </motion.button>
      </motion.div>
    );
  }

  // No courses state
  if (!Array.isArray(courses) || courses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-12 sm:ml-64 mx-auto min-h-[400px] flex items-center justify-center"
      >
        <p className="text-lg text-[#432010] text-center">
          No courses available at the moment. <br />
          Please check back later.
        </p>
      </motion.div>
    );
  }

  // Main content
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-12 sm:ml-64 mx-auto"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl p-4 text-[#432010] font-bold"
      >
        More Safety Courses
      </motion.h2>
    
      <section className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-6 place-items-center" // Fixed gap
        >
          <AnimatePresence>
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="w-full p-3" // Added padding for spacing
              >
                <CourseCard
                  course={course}
                  gradient={gradients[index % gradients.length]}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
      {/* Retry Button - Only show if courses array is empty */}
      {courses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchCourses}
            className="px-6 py-2 bg-[#432010] text-white rounded-full hover:bg-[#543121] transition-colors"
          >
            Refresh Courses
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default CourseCards;
