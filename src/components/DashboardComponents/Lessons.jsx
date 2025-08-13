import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from "dompurify";
import SideBar from "../SideBar";
import { useEffect, useState } from "react";
import SafetyTip from "./lessonComponents/SafetyTip";
import { urls } from "../constants";

// ---------- Helpers ----------
const toPlainText = (html) =>
  DOMPurify.sanitize(html || "", { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

const sanitizeContent = (content) => ({
  __html: DOMPurify.sanitize(content || "", {
    ALLOWED_TAGS: [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "a",
      "img",
      "video",
      "blockquote",
      "pre",
      "code",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "br",
      "span",
      "div",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "class",
      "target",
      "width",
      "height",
      "title",
    ],
  }),
});

// ---------- UI Pieces ----------
const LessonCard = ({ lesson, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.06 }}
    className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden hover:shadow-md transition-shadow duration-300"
  >
    {lesson.image ? (
      <img
        src={lesson.image}
        alt={toPlainText(lesson.title)}
        className="w-full h-48 object-cover"
      />
    ) : null}
    <div className="p-6">
      <h3 className="text-xl font-semibold text-[#432010] mb-4">
        {toPlainText(lesson.title)}
      </h3>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={sanitizeContent(lesson.content)}
      />
    
    </div>
  </motion.div>
);

const ProgressIndicator = ({ current, total }) => {
  const safeTotal = Math.max(1, total || 0);
  const pct = Math.min(
    100,
    Math.max(0, Math.round((current / safeTotal) * 100))
  );
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Progress</span>
        <span className="text-sm font-medium text-[#432010]">{pct}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          className="h-full bg-[#432010] rounded-full"
        />
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[400px]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-[#432010] border-t-transparent rounded-full"
    />
  </div>
);

const ErrorMessage = ({ error, onRetry }) => (
  <div className="text-center py-12">
    <p className="text-red-500 mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-[#432010] text-white rounded-lg hover:bg-opacity-90"
    >
      Try Again
    </button>
  </div>
);

const NoLessonsMessage = () => (
  <div className="text-center py-12 bg-white rounded-xl shadow-sm">
    <p className="text-gray-600">No lessons available for this course.</p>
  </div>
);

const CourseNavigation = ({ lessons, currentLesson, onSelect }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h4 className="text-lg font-semibold text-[#432010] mb-4">
      Course Contents
    </h4>
    <nav className="space-y-2">
      {lessons.map((lesson, index) => (
        <motion.button
          key={lesson._id || `${index}-${toPlainText(lesson.title)}`}
          onClick={() => onSelect(index)}
          whileHover={{ x: 4 }}
          className={`w-full text-left p-3 rounded-lg transition-colors ${
            currentLesson === index
              ? "bg-[#432010] text-white"
              : "hover:bg-gray-100"
          }`}
        >
          <span className="text-sm font-medium">
            {toPlainText(lesson.title)}
          </span>
        </motion.button>
      ))}
    </nav>
  </div>
);

// ---------- Main Component ----------
function Lessons() {
  const { courseId } = useParams();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseTitle, setCourseTitle] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [error, setError] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);

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

      if (!lessonData?.success || !courseData?.success) {
        throw new Error("Invalid data received from server");
      }

      // Normalize titles to plain text once here
      const normalizedLessons = (lessonData.data || []).map((l) => ({
        ...l,
        title: toPlainText(l.title),
      }));

      setLessons(normalizedLessons);
      setCourseTitle(toPlainText(courseData.data?.title));
      setCurrentLesson(0); // reset selection on course change
      setAcknowledged(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load course data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const safeTotal = Math.max(lessons.length, 1);
  const progressCurrent = Math.min(currentLesson + 1, safeTotal);

  return (
    <div className="bg-gray-50 min-h-screen">
      <SideBar />

      <div className="p-4 sm:ml-64">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage error={error} onRetry={fetchData} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main */}
              <div className="lg:col-span-9 space-y-6">
                <header className="bg-white rounded-xl shadow-sm p-6">
                  <h1 className="text-3xl font-bold text-[#432010]">
                    {courseTitle}
                  </h1>
                  <ProgressIndicator
                    current={progressCurrent}
                    total={lessons.length}
                  />
                </header>

                {lessons.length > 0 ? (
                  <div className="space-y-6">
                    {lessons.map((lesson, index) => (
                      <LessonCard
                        key={lesson._id || index}
                        lesson={lesson}
                        index={index}
                      />
                    ))}

                    {/* Acknowledgement */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white rounded-xl shadow-sm p-6"
                    >
                      <h5 className="text-xl font-semibold text-[#432010] mb-4">
                        Acknowledgement
                      </h5>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acknowledged}
                          onChange={(e) => setAcknowledged(e.target.checked)}
                          className="w-5 h-5 text-[#432010] rounded border-gray-300 focus:ring-[#432010]"
                        />
                        <span className="text-gray-700">
                          I have read and understood all the safety training
                          materials
                        </span>
                      </label>

                      <motion.a
                        href={acknowledged ? `/quiz/course/${courseId}` : "#"}
                        onClick={(e) => !acknowledged && e.preventDefault()}
                        whileHover={acknowledged ? { scale: 1.02 } : {}}
                        whileTap={acknowledged ? { scale: 0.98 } : {}}
                        className={`mt-6 inline-flex items-center justify-between px-6 py-3 rounded-full ${
                          acknowledged
                            ? "bg-[#432010] text-white hover:bg-opacity-90"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                      >
                        <span className="font-semibold">Start Assessment</span>
                        <svg
                          className={`ml-2 w-5 h-5 ${
                            acknowledged ? "text-white" : "text-gray-500"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </motion.a>
                    </motion.div>
                  </div>
                ) : (
                  <NoLessonsMessage />
                )}
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-3">
                <div className="space-y-6 sticky top-6">
                  <SafetyTip />
                  <CourseNavigation
                    lessons={lessons}
                    currentLesson={currentLesson}
                    onSelect={(idx) =>
                      setCurrentLesson(
                        Math.min(Math.max(0, idx), lessons.length - 1)
                      )
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lessons;
