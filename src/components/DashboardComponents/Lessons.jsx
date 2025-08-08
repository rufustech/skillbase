import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "../SideBar";
import { useEffect, useState } from "react";
import LessonCard from "./lessonComponents/lessonCards";
import SafetyTip from "./lessonComponents/SafetyTip";
import { urls } from "../constants";

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseTitle, setCourseTitle] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [error, setError] = useState(null);

  const { courseId } = useParams();

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const [lessonResponse, courseResponse] = await Promise.all([
        fetch(`${urls.url}/api/lessons/courses/${courseId}`),
        fetch(`${urls.url}/api/courses/${courseId}`),
      ]);

      if (!lessonResponse.ok || !courseResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const lessonData = await lessonResponse.json();
      const courseData = await courseResponse.json();

      if (lessonData.success && courseData.success) {
        setLessons(lessonData.data);
        setCourseTitle(courseData.data.title);
      } else {
        throw new Error("Invalid data received from server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load course data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SideBar />

      <div className="p-4 sm:ml-64">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeIn}
          className="p-4 shadow-lg rounded-lg bg-white"
        >
          <section className="py-4 md:py-8">
            <div className="container mx-auto px-4">
              <motion.h1
                className="text-4xl font-bold text-[#432010] text-center mb-8"
                variants={fadeIn}
              >
                {courseTitle || "Course Lessons"}
              </motion.h1>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-16 h-16 border-4 border-[#432010] border-t-transparent rounded-full"
                  />
                </div>
              ) : error ? (
                <motion.div
                  variants={fadeIn}
                  className="text-red-500 text-center"
                >
                  {error}
                  <button
                    onClick={fetchData}
                    className="mt-4 px-4 py-2 bg-[#432010] text-white rounded hover:bg-opacity-90 transition"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-12 gap-8">
                  {/* Main content */}
                  <div className="col-span-12 lg:col-span-9 order-2 lg:order-1">
                    <AnimatePresence>
                      {lessons.length > 0 ? (
                        lessons.map((lesson, index) => (
                          <motion.div
                            key={lesson._id}
                            variants={fadeIn}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ delay: index * 0.1 }}
                          >
                            <LessonCard
                              image={lesson.image}
                              title={lesson.title}
                              content={
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: lesson.content,
                                  }}
                                />
                              }
                            />
                          </motion.div>
                        ))
                      ) : (
                        <motion.p
                          variants={fadeIn}
                          className="text-lg text-gray-600 text-center"
                        >
                          No lessons available for this course.
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Acknowledgement */}
                    <motion.div
                      variants={fadeIn}
                      className="bg-blue-100 rounded-lg p-6 mt-8"
                    >
                      <h5 className="font-bold text-xl mb-4 uppercase">
                        Acknowledgement
                      </h5>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acknowledged}
                          onChange={(e) => setAcknowledged(e.target.checked)}
                          className="form-checkbox h-5 w-5 text-[#432010]"
                        />
                        <span className="text-gray-700">
                          I have read and understood the safety training
                        </span>
                      </label>
                    </motion.div>

                    {/* Quiz Button Section */}
                    <motion.div variants={fadeIn} className="mt-12 px-16 py-8">
                      <h4 className="text-2xl font-medium mb-4">
                        Take your Assessment
                      </h4>

                      <motion.a
                        href={acknowledged ? `/quiz/course/${courseId}` : "#"}
                        onClick={(e) => {
                          if (!acknowledged) e.preventDefault();
                        }}
                        whileHover={acknowledged ? { scale: 1.02 } : {}}
                        whileTap={acknowledged ? { scale: 0.98 } : {}}
                        className={`h-16 lg:w-60 bg-[#432010] flex items-center justify-between rounded-full mt-5 p-1.5 transition
      ${
        acknowledged
          ? "hover:opacity-80"
          : "opacity-50 cursor-not-allowed bg-gray-400"
      }`}
                      >
                        <span className="flex flex-1 items-center justify-center text-white text-lg font-bold uppercase">
                          Start Quiz
                        </span>
                        <motion.div
                          className={`h-9 w-9 ${
                            acknowledged ? "bg-white" : "bg-gray-200"
                          } rounded-full flex items-center justify-center -rotate-45`}
                          animate={{ rotate: acknowledged ? -45 : 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`lucide lucide-arrow-right ${
                              acknowledged ? "text-[#432010]" : "text-gray-400"
                            }`}
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                          <span className="sr-only">Arrow Right Icon</span>
                        </motion.div>
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Sidebar */}
                  <div className="col-span-12 lg:col-span-3 order-1 lg:order-2">
                    <motion.div variants={fadeIn}>
                      <SafetyTip />
                    </motion.div>

                    <motion.div
                      variants={fadeIn}
                      className="mt-8 bg-white shadow-lg rounded-lg p-6"
                    >
                      <h4 className="text-xl font-bold text-[#432010] mb-4">
                        Latest Courses
                      </h4>
                      <ul className="space-y-4">
                        {[
                          "Workplace Safety for Underground Mining",
                          "Hazard Identification and Risk Assessment",
                          "Equipment Operation and Maintenance Safety",
                        ].map((course, index) => (
                          <motion.li
                            key={index}
                            whileHover={{ x: 5 }}
                            className="border-b pb-2"
                          >
                            <a
                              href="#"
                              className="text-gray-700 hover:text-[#432010] transition"
                            >
                              {course}
                            </a>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default Lessons;
