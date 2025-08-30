import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { urls } from "../../constants";
import { FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function CourseHero() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Define gradient colors for cards
  const gradients = [
    "from-blue-500 to-blue-600",
    "from-green-500 to-green-600",
    "from-purple-500 to-purple-600",
    "from-orange-500 to-orange-600",
  ];

  async function fetchCourses() {
    try {
      setIsLoading(true);
      const response = await fetch(`${urls.url}/api/courses`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setFeaturedCourses(data.data.slice(0, 4));
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
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to={`/lessons/courses/${course._id}`}>
                      <div
                        className={`
                          h-full p-6 rounded-xl shadow-lg
                          bg-gradient-to-br ${gradients[index]}
                          transform transition-all duration-300
                          hover:shadow-xl
                          flex flex-col items-center justify-center
                          text-white
                          min-h-[200px]
                        `}
                      >
                        <div className="mb-4">
                          <FaShieldAlt className="text-4xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-2">
                          {course.title || `Safety Course ${index + 1}`}
                        </h3>
                        <p className="text-sm text-center opacity-90 line-clamp-2">
                          {course.description ||
                            "Course description loading..."}
                        </p>

                        {/* Optional: Add some metadata */}
                        <div className="mt-4 pt-4 border-t border-white/20 w-full flex justify-between text-xs opacity-75">
                          <span>Duration: 2h</span>
                          <span>Lessons: {course.lessons?.length || 0}</span>
                        </div>
                      </div>
                    </Link>
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
