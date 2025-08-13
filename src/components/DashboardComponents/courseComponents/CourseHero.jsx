import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { urls } from "../../constants";
import { FaShieldAlt } from "react-icons/fa";

function CourseHero() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCourses() {
    try {
      setIsLoading(true);
      const response = await fetch(`${urls.url}/api/courses`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setFeaturedCourses(data.data.slice(0, 4)); // Only take first 4 courses
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load featured courses");
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
      <div className="px-12 sm:ml-64 mx-auto min-h-[400px] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#432010] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="p-4 sm:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="grid xl:grid-cols-12 gap-6">
          {/* Left Column - Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-12 xl:col-span-4"
          >
            <h2 className="text-4xl text-[#432010] font-bold mb-4">
              Your Safety, Our Commitment
            </h2>
            <p className="text-lg text-gray-700 mb-6 bg-white/90 p-4 rounded-lg shadow-sm">
              These safety courses are more than training—they're a promise. A
              promise to protect you, so you can return home safely every day.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <h3
                className="px-6 py-3 text-center text-xl rounded-full text-[#432010] 
                           font-bold shadow-lg border-2 border-[#432010] cursor-pointer
                           hover:bg-[#432010] hover:text-white transition-all duration-300"
              >
                Ongoing Safety Incidents
              </h3>
            </motion.div>
          </motion.div>

          {/* Right Column - Featured Courses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-12 xl:col-span-8"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <AnimatePresence>
                {featuredCourses.map((course, index) => (
                  <motion.div
                    key={course._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg 
                             transition-all duration-300 border border-gray-100"
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <FaShieldAlt className="text-[#432010] text-xl" />
                        <h3 className="text-lg font-semibold text-[#432010]">
                          {course.title || `Safety Course ${index + 1}`}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {course.description || "Course description loading..."}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
